"""Original procedural fireplace candidate, not a field recording or AI model output."""
from pathlib import Path
import json,wave
import numpy as np
out=Path(__file__).parent
sr=48000;seconds=30;n=sr*seconds;rng=np.random.default_rng(16112026)

def colored(size,low,high,pink=0):
 f=np.fft.rfftfreq(size,1/sr)
 z=np.fft.rfft(rng.normal(size=size))
 weight=1/np.sqrt(1+(f/high)**6)
 if low:weight*=1/np.sqrt(1+(low/np.maximum(f,1e-9))**6)
 if pink:weight*=np.maximum(f,30)**(-pink/2)
 weight[0]=0
 y=np.fft.irfft(z*weight,n=size)
 return y/max(np.std(y),1e-9)

def motion(size):
 t=np.arange(size)/sr
 y=sum(rng.uniform(.1,.3)*np.sin(2*np.pi*k*t/seconds+rng.uniform(0,6.28)) for k in [2,5,9,17])
 return np.exp(y*.4)

# Periodic filtered noise and periodic modulation make the texture wrap naturally.
base=colored(n,45,650,1.0)*.018*motion(n)
flicker=colored(n,250,1800,.5)*.0025*motion(n)
left=base+flicker+colored(n,90,900,.5)*.002
right=np.roll(base,round(.0004*sr))+np.roll(flicker,round(.0008*sr))+colored(n,90,900,.5)*.002
x=np.column_stack([left,right])
events=[]
# Soft close crackles with varied attack/decay and no explosive foreground pops.
for k in range(44):
 start=int(rng.uniform(0,n));length=int(sr*rng.uniform(.045,.19));t=np.arange(length)/sr
 attack=rng.uniform(.0018,.005);decay=rng.uniform(.013,.045)
 env=(1-np.exp(-t/attack))*np.exp(-t/decay)
 body=colored(length,160,rng.uniform(1300,3300),.25)
 resonance=np.sin(2*np.pi*rng.uniform(200,650)*t)*np.exp(-t/.022)
 strength=rng.uniform(.009,.029)*(1.4 if k%11==0 else 1)
 sound=(body*.75+resonance*.25)*env*strength
 pan=rng.uniform(-.4,.4);g=np.sqrt([(1-pan)/2,(1+pan)/2])
 idx=(start+np.arange(length))%n
 x[idx]+=sound[:,None]*g
 events.append(round(start/sr,3))
x-=x.mean(axis=0)
# Leave generous playback headroom; no automatic loudness maximization.
scale=min(1,10**(-12/20)/abs(x).max());x*=scale

def write(path,y):
 with wave.open(str(path),'wb') as w:
  w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr)
  w.writeframes(np.clip(np.rint(y*32768),-32768,32767).astype('<i2').tobytes())
write(out/'ambient-fire-loop.wav',x)
preview=np.concatenate([x[-6*sr:],x[:6*sr]])
fade=np.linspace(0,1,int(sr*.025))[:,None]
preview[:len(fade)]*=fade;preview[-len(fade):]*=fade[::-1]
write(out/'ambient-fire-seam-preview.wav',preview)
step=float(abs(x[-1]-x[0]).max());p99=float(np.quantile(abs(np.diff(x,axis=0)),.99))
assert np.isfinite(x).all() and abs(x).max()<1 and step<p99
report={'kind':'procedural_synthesis_not_recording','status':'candidate_requires_listening','sample_rate':sr,'channels':2,'duration_seconds':seconds,'events':len(events),'peak_dbfs':float(20*np.log10(abs(x).max())),'rms_dbfs':float(20*np.log10(np.sqrt(np.mean(x*x)))),'boundary_step':step,'normal_sample_step_p99':p99,'seed':16112026,'preview_seam_seconds':6}
(out/'ambient-fire-analysis.json').write_text(json.dumps(report,indent=2)+'\n')
(out/'README.md').write_text('''# Пробный камин\n\nОригинальный программный синтез, не запись реального камина и не результат генеративной аудиомодели.\n\n`ambient-fire-loop.wav`: 30 с, PCM16 stereo 48 kHz. Низкочастотный фон горения и 44 негромких события потрескивания. Шум, модуляция и размещение событий рассчитаны циклически.\n\n`ambient-fire-seam-preview.wav`: 12 с, стык на 6-й секунде.\n\nПроверены формат, отсутствие клиппинга и скачок отсчётов на границе. Реалистичность и удобство длительного прослушивания не оценены на слух; требуется пользовательское прослушивание. В игру пока не подключено.\n\nВоспроизведение: отдельный тихий атмосферный слой; окончательную громкость выбрать в контексте музыки. Скрипт воспроизводим с Python + NumPy.\n''')
print(json.dumps(report,indent=2))
