"""Prepare a candidate menu loop using spectral matching; listening approval remains necessary."""
from pathlib import Path
import argparse, hashlib, json, wave
import numpy as np
p=argparse.ArgumentParser();p.add_argument('source',type=Path);p.add_argument('--output',type=Path,default=Path(__file__).parent/'processed');a=p.parse_args();a.output.mkdir(parents=True,exist_ok=True)
with wave.open(str(a.source)) as w:
 rate=w.getframerate();channels=w.getnchannels();width=w.getsampwidth();raw=w.readframes(w.getnframes())
assert width==2 and channels==2,'Expected stereo PCM16'
x=np.frombuffer(raw,dtype='<i2').reshape(-1,channels).astype(np.float32)/32768
mono=x.mean(axis=1); hop=4800
rms=np.array([np.sqrt(np.mean(mono[i:i+hop]**2)) for i in range(0,len(x),hop)])
active=np.flatnonzero(rms>max(rms.max()*.025,10**(-65/20)))
# FFT at 8kHz; features combine pitch classes, broad spectrum and loudness.
y=mono[::6];sr=rate/6;n=4096;h=800
frames=np.lib.stride_tricks.sliding_window_view(y,n)[::h]
spec=abs(np.fft.rfft(frames*np.hanning(n),axis=1))**2
freq=np.fft.rfftfreq(n,1/sr);valid=(freq>65)&(freq<2500)
midi=np.rint(69+12*np.log2(np.maximum(freq,1)/440)).astype(int)
chroma=np.stack([spec[:,valid&(midi%12==k)].sum(axis=1) for k in range(12)],axis=1)
chroma=np.sqrt(chroma);chroma/=np.maximum(np.linalg.norm(chroma,axis=1,keepdims=True),1e-10)
bands=np.stack([spec[:,(freq>=lo)&(freq<hi)].sum(axis=1) for lo,hi in [(65,200),(200,500),(500,1200),(1200,3500)]],axis=1)
bands=np.sqrt(bands);bands/=np.maximum(np.linalg.norm(bands,axis=1,keepdims=True),1e-10)
loud=np.log(np.maximum(np.sqrt(np.mean(frames**2,axis=1)),1e-6))
feat=np.concatenate([chroma,bands*.45,loud[:,None]*.18],axis=1)
# Compare several seconds of evolving harmony around both overlap regions.
step=h/sr;window=30;cross=3.0
starts=range(max(20,int((active[0]*.1+2)/step)),int(38/step))
ends=range(int(145/step),min(len(feat)-window,int((active[-1]*.1-cross)/step)))
best=None
for i in starts:
 head=feat[i:i+window]
 for j in ends:
  if (j-i)*step<125:continue
  score=float(np.mean((head-feat[j:j+window])**2))
  # Prefer retaining more music when matches are comparable.
  objective=score+.000002*(183-(j-i)*step)
  if best is None or objective<best[0]:best=(objective,score,i,j)
_,score,i,j=best
s=round(i*step*rate);e=round((j*step+cross)*rate);L=round(cross*rate)
section=x[s:e].copy();weights=np.linspace(0,1,L,dtype=np.float32)[:,None]
# Linear crossfade avoids boosting strongly correlated material.
blend=section[-L:]*(1-weights)+section[:L]*weights
loop=np.concatenate([section[L:-L],blend])
peak=float(abs(loop).max());gain=min(1,10**(-1/20)/max(peak,1e-8));loop*=gain

def write(path,data):
 with wave.open(str(path),'wb') as w:
  w.setnchannels(channels);w.setsampwidth(2);w.setframerate(rate)
  w.writeframes(np.clip(np.rint(data*32768),-32768,32767).astype('<i2').tobytes())
write(a.output/'music-menu-loop.wav',loop)
preview=np.concatenate([loop[-12*rate:],loop[:12*rate]])
# Preview-only fades at outside edges, never at the seam.
fade=np.linspace(0,1,int(rate*.03))[:,None];preview[:len(fade)]*=fade;preview[-len(fade):]*=fade[::-1]
write(a.output/'music-menu-seam-preview.wav',preview)
report={'source':str(a.source),'source_sha256':hashlib.sha256(raw).hexdigest(),'source_seconds':len(x)/rate,'sample_rate':rate,'channels':channels,'source_peak_dbfs':float(20*np.log10(max(abs(x).max(),1e-10))),'clipped_source_samples':int(np.count_nonzero(abs(x)>=32767/32768)),'source_rms_dbfs':float(20*np.log10(np.sqrt(np.mean(x*x)))),'source_active_range_seconds':[float(active[0]*.1),float((active[-1]+1)*.1)],'selected_source_start_seconds':s/rate,'selected_source_end_seconds':e/rate,'crossfade_seconds':cross,'loop_seconds':len(loop)/rate,'gain_db':float(20*np.log10(gain)),'loop_peak_dbfs':float(20*np.log10(abs(loop).max())),'loop_seam_max_channel_step':float(abs(loop[-1]-loop[0]).max()),'spectral_match_mse':score,'status':'candidate_prepared_requires_listening','method':'Spectral and pitch-class sequence matching, 3 second linear cyclic crossfade. No subjective listening assessment performed.'}
(a.output/'music-menu-analysis.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
