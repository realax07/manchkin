# Промпты Suno — Подземная таверна

Полная новая библиотека. План и правила подключения: [sound-redesign-plan.md](sound-redesign-plan.md). Эти тексты ещё не проверены генерацией и прослушиванием. Длительность в промпте — пожелание, финальную длину доводим при обработке.

## Как генерировать

- Эффекты: Create → Sounds → One Shot. Каждый блок ниже — самостоятельный запрос; не объединять несколько ID в одну генерацию.
- Фоны: Create → Sounds → Loop. Если вместо шума появилась музыка, перегенерировать с акцентом на конкретный физический источник.
- Музыка: Create, включить Instrumental; текст вставлять в описание стиля. Сценарий запрашивает удобную для зацикливания фактуру, стык всё равно проверяем и при необходимости монтируем.
- Для каждого ID отобрать один основной дубль; для часто повторяемых эффектов оставить несколько естественных вариантов. Не покупать новый тариф ради этого плана: сначала проверить доступность Sounds в своём аккаунте.
- Указанные секунды — целевые длины игровых файлов, а не обещание точного результата Suno. Очень короткий эффект можно вырезать из более длинного дубля.

## 01. ui_click — Нажатие

**Режим:** One Shot · **Цель:** 0.12 с · **Отобрать вариантов:** 3 · **Этап:** P0

**Когда:** Обычная активная кнопка, только локально.

```text
0.12 seconds. One soft rounded wooden peg tap, subtle felt damping, gentle tactile attack, no high pitched beep. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 02. ui_select — Выбор

**Режим:** One Shot · **Цель:** 0.18 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Выбор набора, цели или карты в оплату.

```text
0.18 seconds. One tiny wooden token seating into a shallow slot, soft short click and muted papery touch. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 03. ui_open — Открытие панели

**Режим:** One Shot · **Цель:** 0.3 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Микшер, правила, настройки, альбом.

```text
0.3 seconds. A small parchment flap gently opening, soft leather hinge and short airy paper movement. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 04. ui_close — Закрытие панели

**Режим:** One Shot · **Цель:** 0.25 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Закрыть окно или отменить выбор.

```text
0.25 seconds. A small parchment flap folding shut with a soft muted wooden touch, quieter than an opening cue. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 05. ui_error — Действие недоступно

**Режим:** One Shot · **Цель:** 0.4 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Реально отклонённая команда или ошибка выбора.

```text
0.4 seconds. Two low muted wooden knocks, gently descending resonance, restrained friendly warning, no alarm. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 06. game_start — Новая партия

**Режим:** One Shot · **Цель:** 2 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** После подтверждённого старта и перед раздачей.

```text
2 seconds. A small wooden game box opening, followed by a cheerful three note lute flourish, intimate playful tabletop adventure. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 07. turn_local — Твой ход

**Режим:** One Shot · **Цель:** 0.7 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Начало собственного хода; в hotseat после передачи устройства.

```text
0.7 seconds. Three clear soft wooden chimes rising gently, a short attentive invitation, warm intimate tone. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 08. turn_other — Чужой ход

**Режим:** One Shot · **Цель:** 0.3 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Смена активного соперника.

```text
0.3 seconds. One quiet low wooden token knock, soft rounded transient, understated neutral notification. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 09. reaction_needed — Нужен ответ

**Режим:** One Shot · **Цель:** 0.65 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Локальному игроку впервые открыто окно реакции или обязательного выбора.

```text
0.65 seconds. Two soft hollow wooden chimes with a pause between them, distinctive questioning shape, calm but noticeable. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 10. hotseat_handoff — Передача устройства

**Режим:** One Shot · **Цель:** 0.8 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Экран передачи устройства следующему человеку.

```text
0.8 seconds. A small wooden tray sliding across felt and settling gently, followed by one muted wooden chime. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 11. card_inspect — Просмотр карты

**Режим:** One Shot · **Цель:** 0.22 с · **Отобрать вариантов:** 3 · **Этап:** P0

**Когда:** Открытие подробностей карты.

```text
0.22 seconds. One thick paper card gently lifted and flexed, close dry subtle cardstock rustle. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 12. card_draw — Взять карту

**Режим:** One Shot · **Цель:** 0.35 с · **Отобрать вариантов:** 3 · **Этап:** P0

**Когда:** Получение обычной карты без раскрытия её типа соперникам.

```text
0.35 seconds. One thick paper playing card sliding off a deck onto a felt covered wooden table, crisp gentle paper scrape. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 13. card_play — Разыграть карту

**Режим:** One Shot · **Цель:** 0.3 с · **Отобрать вариантов:** 3 · **Этап:** P0

**Когда:** Подтверждённый розыгрыш без более характерного эффекта.

```text
0.3 seconds. One thick playing card placed face up on felt, short firm papery slap, soft woody body. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 14. card_discard — Сбросить карту

**Режим:** One Shot · **Цель:** 0.4 с · **Отобрать вариантов:** 3 · **Этап:** P0

**Когда:** Сброс, оплата способности картами, потеря карты из руки.

```text
0.4 seconds. One thick card flicked sideways onto a small discard pile, papery flutter then muted stack tap. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 15. card_deal — Раздача

**Режим:** One Shot · **Цель:** 1.5 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Начальные 4+4, новая рука после смерти, обмен всей руки.

```text
1.5 seconds. A short brisk sequence of eight thick cards being dealt onto soft felt, clean separated papery taps, no counting voice. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 16. card_shuffle — Перемешать колоду

**Режим:** One Shot · **Цель:** 1.8 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Реальное перемешивание сброса в колоду.

```text
1.8 seconds. A compact hand shuffled deck of thick paper cards, gentle riffle and squared stack tap on felt. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 17. card_transfer — Передать карту

**Режим:** One Shot · **Цель:** 0.55 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Милостыня, подарок, доля помощнику, обмен между игроками.

```text
0.55 seconds. A thick paper card sliding across felt from one side to another, soft handoff tap at the end. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 18. card_recover — Вернуть карту

**Режим:** One Shot · **Цель:** 0.6 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Взятие из сброса, возврат Бумкинжала, подбор карты.

```text
0.6 seconds. A thick card sliding backward out of a stack with a light upward airy flick and a soft wooden tap. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 19. door_kick — Вышибить дверь

**Режим:** One Shot · **Цель:** 0.9 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Раскрытие двери до результата.

```text
0.9 seconds. A boot striking a small old wooden dungeon door, a chunky wooden thud, brief hinge creak and latch rattle, playful scale, no explosion. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 20. room_search — Обыск комнаты

**Режим:** One Shot · **Цель:** 1.1 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Обыск после безопасной двери.

```text
1.1 seconds. A small wooden drawer opening, brief cloth rummage and a gentle object tap, intimate tabletop scale. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 21. dungeon_change — Новое подземелье

**Режим:** One Shot · **Цель:** 1.8 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Применение карты подземелья.

```text
1.8 seconds. A heavy stone slab sliding briefly with a low airy cavern swell and soft grit settling, mysterious but friendly fantasy. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 22. monster_reveal — Появление монстра

**Режим:** One Shot · **Цель:** 1.2 с · **Отобрать вариантов:** 2 · **Этап:** P0

**Когда:** Первое вступление монстра в бой.

```text
1.2 seconds. A short low wooden drum thump followed by a rough bowed wood scrape and tiny comic bassoon puff, ominous but mischievous, no creature voice. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 23. monster_join — Ещё один монстр

**Режим:** One Shot · **Цель:** 1.1 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Бродячая тварь, нежить, пара, Мамочка.

```text
1.1 seconds. Two staggered heavy soft footstep thuds and a low wooden rattle, an extra troublemaker arriving, compact playful threat. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 24. monster_buff — Монстр усилен

**Режим:** One Shot · **Цель:** 0.8 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Положительный усилитель монстра.

```text
0.8 seconds. A low rough bowed wood tone swelling upward into a compact drum bump, growing mischievous threat. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 25. monster_debuff — Монстр ослаблен

**Режим:** One Shot · **Цель:** 0.75 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Отрицательный усилитель монстра.

```text
0.75 seconds. A short rough wooden resonance drooping downward into a soft hollow plop, comic loss of power, restrained. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 26. combat_redirect — Передача боя

**Режим:** One Shot · **Цель:** 1.1 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Зелье передачи и смена бойца.

```text
1.1 seconds. A compact swirling airy sweep moving sideways, ending in a solid wooden token landing, clear playful redirection. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 27. combat_peace — Бой без убийства

**Режим:** One Shot · **Цель:** 1.3 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Дружелюбие, уход монстров, проход мимо, откуп.

```text
1.3 seconds. A tense low wooden resonance releasing into two relaxed soft lute notes, a gentle retreating airy puff, peaceful comic resolution, no victory fanfare. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 28. combat_victory — Победа в бою

**Режим:** One Shot · **Цель:** 2.2 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Окончательно разрешённая победа, не её заявление.

```text
2.2 seconds. A concise cheerful acoustic fantasy victory flourish, lute and wooden drum with a tiny warm brass accent, four resolved notes, small tavern celebration. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 29. game_win_local — Ты победил в партии

**Режим:** One Shot · **Цель:** 5 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Финальная победа локального игрока; hotseat общий финал.

```text
5 seconds. A playful triumphant acoustic fantasy fanfare, lute, recorder, light hand drum and warm small brass ensemble, memorable rising motif and fully resolved ending, intimate tavern celebration. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 30. game_win_other — Победил соперник

**Режим:** One Shot · **Цель:** 3 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Финальная победа другого игрока на сетевом клиенте или бота.

```text
3 seconds. A gently rueful comic acoustic fantasy ending, low bassoon and lute, two drooping notes followed by a warm resolved chord, good humored defeat, no tragedy. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 31. escape_attempt — Попытка смывки

**Режим:** One Shot · **Цель:** 0.65 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Начало последовательности смывки до броска.

```text
0.65 seconds. Three quick soft leather boot scuffs on wood, accelerating lightly, short comic departure gesture. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 32. dice_roll — Бросок кубика

**Режим:** One Shot · **Цель:** 1.1 с · **Отобрать вариантов:** 3 · **Этап:** P0

**Когда:** Любой реальный бросок, включая кражу и барда.

```text
1.1 seconds. One wooden six sided die rattling in a small cup, rolling and bouncing on a felt covered wooden table, slowing naturally to one final tap. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 33. dice_change — Подмена кубика

**Режим:** One Shot · **Цель:** 0.7 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Применение Читеры или Перезаряженного кубика.

```text
0.7 seconds. A wooden die scraped sideways and flicked into a new position, with one small mischievous metallic tick, distinct from a full dice roll. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 34. escape_success — Успешная смывка

**Режим:** One Shot · **Цель:** 0.9 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Результат смывки без непотребства.

```text
0.9 seconds. Quick light bootsteps fading away followed by two airy ascending wooden chime notes, relieved comic success. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 35. escape_fail — Неудачная смывка

**Режим:** One Shot · **Цель:** 0.85 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Неудача без смерти; перед конкретным непотребством.

```text
0.85 seconds. Two quick boot scuffs abruptly stopped by a low padded wooden bump, restrained awkward failure, no bodily injury sounds. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 36. bad_stuff — Непотребство

**Режим:** One Shot · **Цель:** 1 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Отдельное последствие, не покрытое смертью или потерей уровня/предмета.

```text
1 seconds. A small loose wooden mechanism collapsing with a low hollow rattle and one dull final clunk, comic setback, no gore. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 37. character_death — Смерть персонажа

**Режим:** One Shot · **Цель:** 2.4 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Подтверждённая смерть, один раз на исход.

```text
2.4 seconds. A low wooden drum knock, a loose helmet wobbling to rest and a brief descending bassoon sigh, cartoon fantasy defeat, no voice, no gore, no horror. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 38. character_return — Возвращение после смерти

**Режим:** One Shot · **Цель:** 1.6 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Начало следующего хода умершего перед новой раздачей.

```text
1.6 seconds. A quiet upward breath of airy magic, three warm lute notes and a small wooden token settling upright, fresh start, friendly fantasy. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 39. loot_receive — Получены сокровища

**Режим:** One Shot · **Цель:** 1 с · **Отобрать вариантов:** 2 · **Этап:** P0

**Когда:** Фактическая выдача сокровищ, в том числе отложенная.

```text
1 seconds. A small treasure box latch clicking open followed by a few delicate coins and gems settling on soft cloth, bright but restrained. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 40. coins_sale — Продажа

**Режим:** One Shot · **Цель:** 0.65 с · **Отобрать вариантов:** 2 · **Этап:** P0

**Когда:** Получение золота за вещь, включая гаражную распродажу.

```text
0.65 seconds. A small handful of gold coins dropping into a leather pouch, warm light metallic clinks and a soft leather settle, no sparkle melody. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 41. loot_blocked — Награда заблокирована

**Режим:** One Shot · **Цель:** 0.7 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Золото дураков, чёрный список или иное публичное блокирование награды.

```text
0.7 seconds. A tiny treasure box lid closing with a muted latch click and one hollow disappointed wooden plink. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 42. level_up — Повышение уровня

**Режим:** One Shot · **Цель:** 1.3 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Фактический рост уровня вне итоговой победы.

```text
1.3 seconds. Four warm wooden chime and lute notes rising clearly, modest magical progression, bright resolved final note, no grand fanfare. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 43. level_down — Потеря уровня

**Режим:** One Shot · **Цель:** 0.9 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Фактическое уменьшение уровня.

```text
0.9 seconds. Three rounded wooden chime notes descending with a soft low lute pluck, clear restrained loss, no comic trombone blast. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 44. equip_on — Надеть предмет

**Режим:** One Shot · **Цель:** 0.65 с · **Отобрать вариантов:** 2 · **Этап:** P0

**Когда:** Предмет, скакун или наёмник помещён в снаряжение.

```text
0.65 seconds. A leather equipment strap pulled snug, a light metal buckle click and a small padded gear clink, dry close fantasy foley. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 45. equip_off — Снять предмет

**Режим:** One Shot · **Цель:** 0.5 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Добровольное снятие вещи или перенос в переносимые.

```text
0.5 seconds. A small metal buckle released and leather gear gently laid onto cloth, softer and looser than equipping. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 46. item_lost — Потеря предмета

**Режим:** One Shot · **Цель:** 0.8 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Сброс или уничтожение вещи из игры из-за эффекта.

```text
0.8 seconds. A small metal buckle snapping loose, a brief falling gear clatter muffled by cloth, compact restrained loss. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 47. identity_change — Смена класса или расы

**Режим:** One Shot · **Цель:** 1.1 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Класс, раса, расширение или аура реально применены/заменены.

```text
1.1 seconds. A soft parchment unfurl with three warm resonant wooden chimes blooming outward, a subtle magical change of identity. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 48. item_enchant — Усиление вещи

**Режим:** One Shot · **Цель:** 1 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Чит, Рока, прикрепление усилителя или снаряжение наёмника.

```text
1 seconds. A small metal buckle tap surrounded by a quick ascending sparkling glass shimmer, ending dry and compact. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 49. curse_cast — Проклятие наложено

**Режим:** One Shot · **Цель:** 1.2 с · **Отобрать вариантов:** 2 · **Этап:** P0

**Когда:** Подтверждённое применение проклятия после защит.

```text
1.2 seconds. A short papery hiss, low dissonant bowed wood ripple and muted glass rattle, mischievous dark fantasy magic, no scary scream. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 50. curse_block — Проклятие отражено

**Режим:** One Shot · **Цель:** 0.8 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Успешная защита до применения проклятия.

```text
0.8 seconds. A brief incoming airy hiss bouncing off a small resonant glass shield, one clear rounded protective chime and fast decay. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 51. curse_remove — Проклятие снято

**Режим:** One Shot · **Цель:** 1.1 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Кольцо Хотения, очищение или публичное окончание проклятия.

```text
1.1 seconds. A low tangled glass resonance unraveling upward into two clean soft bell notes, gentle release and clarity. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 52. magic_cast — Общая магия

**Режим:** One Shot · **Цель:** 0.9 с · **Отобрать вариантов:** 2 · **Этап:** P0

**Когда:** Магический эффект без более точной категории.

```text
0.9 seconds. A brief airy spiral with three delicate glass ticks rising, compact tactile fantasy magic, soft high frequencies. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 53. potion_use — Зелье

**Режим:** One Shot · **Цель:** 0.9 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Применение одноразового зелья; если итог не заменён главным эффектом.

```text
0.9 seconds. A tiny glass vial uncorking, one short bubbling liquid splash and a soft magical fizz, dry close sound, no drinking voice. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 54. magic_fire — Огонь

**Режим:** One Shot · **Цель:** 0.85 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Подтверждённый огненный эффект без другого ведущего сигнала.

```text
0.85 seconds. A small magical flame igniting with a short warm whoosh and gentle crackle, controlled tabletop scale, no explosion. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 55. magic_ice — Холод

**Режим:** One Shot · **Цель:** 0.9 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Подтверждённый ледяной эффект без другого ведущего сигнала.

```text
0.9 seconds. A short icy breath sweeping over tiny glass crystals, delicate restrained brittle crackle and quick clean decay. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 56. magic_vanish — Исчезновение

**Режим:** One Shot · **Цель:** 1.1 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Аннигиляция, исчезновение или магическое удаление цели.

```text
1.1 seconds. A compact inward airy suction, a tiny glass snap and fast fading whisper of dust, magical removal, no cinematic bass boom. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 57. magic_illusion — Иллюзия и двойник

**Режим:** One Shot · **Цель:** 1.3 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Иллюзия гнома, подмена монстра, двойник.

```text
1.3 seconds. A soft glass shimmer splitting into two closely spaced wavering tones, then recombining into a light airy ripple, playful illusion. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 58. magic_divine — Божественное вмешательство

**Режим:** One Shot · **Цель:** 2 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Фактическое применение соответствующей карты.

```text
2 seconds. A warm radiant chord on soft glass bells and lightly plucked strings, brief upward magical bloom, clear sacred feeling without choir or voices. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 59. help_request — Просьба о помощи

**Режим:** One Shot · **Цель:** 0.8 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Новый адресованный локальному игроку запрос.

```text
0.8 seconds. Two warm questioning lute plucks with a small wooden knock between them, friendly concise invitation. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 60. help_accept — Помощь принята

**Режим:** One Shot · **Цель:** 0.85 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Помощник присоединился, включая принудительную помощь.

```text
0.85 seconds. Two wooden tokens placed together followed by a warm consonant double lute pluck, compact sense of alliance. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 61. help_decline — Отказ от помощи

**Режим:** One Shot · **Цель:** 0.55 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Явный отказ выбранного помощника.

```text
0.55 seconds. One soft low wooden tap followed by a muted descending lute pluck, polite restrained refusal. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 62. sabotage — Подстава

**Режим:** One Shot · **Цель:** 0.75 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Враждебное вмешательство без более точного эффекта.

```text
0.75 seconds. A quick sneaky paper flick and a short metallic wooden clash, mischievous tabletop interruption, no sword fight sequence. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 63. ability_berserk — Ярость воина

**Режим:** One Shot · **Цель:** 0.8 с · **Отобрать вариантов:** 1 · **Этап:** P2

**Когда:** Оплаченная активация Ярости.

```text
0.8 seconds. Two compact hand drum strikes rising in strength and a short leather tension creak, controlled burst of warrior energy, no yell. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 64. ability_turn_undead — Изгнание нежити

**Режим:** One Shot · **Цель:** 1.2 с · **Отобрать вариантов:** 1 · **Этап:** P2

**Когда:** Активация способности клирика.

```text
1.2 seconds. A bright warm handbell strike pushing away a brief dry bone rattle, clean compact holy pulse, no choir. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 65. ability_resurrect — Воскресить дверь

**Режим:** One Shot · **Цель:** 1.1 с · **Отобрать вариантов:** 1 · **Этап:** P2

**Когда:** Способность клирика возвращает верхнюю дверь из сброса.

```text
1.1 seconds. An old paper card gently lifting from a stack with a warm upward glass shimmer, arcane recovery, distinct from character revival. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 66. ability_charm — Зачаровать монстра

**Режим:** One Shot · **Цель:** 1.2 с · **Отобрать вариантов:** 1 · **Этап:** P2

**Когда:** Успешное зачарование волшебником.

```text
1.2 seconds. Three soft hypnotic glass tones curling downward into a warm mellow lute chord, gentle magical persuasion, no voices. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 67. ability_backstab — Подрезка

**Режим:** One Shot · **Цель:** 0.65 с · **Отобрать вариантов:** 1 · **Этап:** P2

**Когда:** Успешная активация вора.

```text
0.65 seconds. A quick leather swish and a small dry metal tick ending in a muted wooden knock, sneaky comic interruption, no stabbing flesh. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 68. ability_theft_success — Успешная кража

**Режим:** One Shot · **Цель:** 0.75 с · **Отобрать вариантов:** 1 · **Этап:** P2

**Когда:** Кража после разрешённого броска.

```text
0.75 seconds. A furtive cloth pocket rustle, tiny metal buckle clink and short upward wooden plink, discreet successful theft. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 69. ability_theft_fail — Поймали на краже

**Режим:** One Shot · **Цель:** 0.8 с · **Отобрать вариантов:** 1 · **Этап:** P2

**Когда:** Неудачная кража после броска.

```text
0.8 seconds. A furtive cloth rustle abruptly cut off by two firm wooden knocks, awkward caught in the act gesture, no voices or alarm. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 70. ability_enthrall — Чары барда

**Режим:** One Shot · **Цель:** 1.1 с · **Отобрать вариантов:** 1 · **Этап:** P2

**Когда:** Успешное завораживание помощника после сравнения бросков.

```text
1.1 seconds. A short charming three note lute glissando resolving into a soft glass shimmer, playful persuasion, no singing. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 71. ability_tame — Приручение

**Режим:** One Shot · **Цель:** 1.3 с · **Отобрать вариантов:** 1 · **Этап:** P2

**Когда:** Монстр превращён в скакуна или союзника.

```text
1.3 seconds. A rough low wooden rattle softening into two friendly rounded wooden notes and a leather harness buckle click, comic taming, no animal voice. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 72. ability_claws — Кошачьи когти

**Режим:** One Shot · **Цель:** 0.75 с · **Отобрать вариантов:** 1 · **Этап:** P2

**Когда:** Оплаченная активация друида.

```text
0.75 seconds. Three quick light claw scratches on wood with a short leaf like airy swish, nimble magical transformation, no meow. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 73. ability_scavenge — Подбор из сброса

**Режим:** One Shot · **Цель:** 0.75 с · **Отобрать вариантов:** 1 · **Этап:** P2

**Когда:** Букашка забирает класс или расу из сброса.

```text
0.75 seconds. Two tiny dry skittering wooden taps followed by a paper card being pulled free from a stack, clever quiet scavenging. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 74. level_steal — Кража уровня

**Режим:** One Shot · **Цель:** 1.1 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Укради уровень: единый эффект переноса.

```text
1.1 seconds. A rounded wooden chime tone sliding downward on one side then rising on the other, tiny mischievous glass tick, clear magical transfer. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 75. net_join — Игрок вошёл

**Режим:** One Shot · **Цель:** 0.65 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Новое присутствие в сетевой комнате.

```text
0.65 seconds. A quiet wooden chair foot sliding briefly into place and one warm upward wooden chime, friendly arrival notification. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 76. net_leave — Игрок вышел

**Режим:** One Shot · **Цель:** 0.55 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Подтверждённый выход игрока из комнаты.

```text
0.55 seconds. A quiet wooden chair foot sliding gently away and one soft downward wooden chime, neutral departure notification. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 77. net_lost — Связь потеряна

**Режим:** One Shot · **Цель:** 0.85 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Первый переход в состояние потери соединения.

```text
0.85 seconds. Two low rounded wooden chimes with a brief gap, restrained unresolved ending, calm connection warning, no siren. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 78. net_restored — Связь восстановлена

**Режим:** One Shot · **Цель:** 0.75 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Успешное восстановление после потери.

```text
0.75 seconds. Two warm wooden chimes resolving upward into a gentle consonant interval, brief reassuring connection restored notification. Single isolated game sound effect for a humorous acoustic fantasy card game in a cozy underground tavern. No speech, no vocals, no background music, no ambient bed. Clean onset, natural short tail, no long silence, no clipping.
```

## 79. music_menu — Меню и лобби

**Режим:** Instrumental · **Цель:** 120 с · **Отобрать вариантов:** 2 · **Этап:** P0

**Когда:** Меню, выбор наборов, сетевая комната.

```text
Instrumental acoustic fantasy background music for a humorous card game in a cozy underground tavern. A relaxed welcoming melody on lute and soft recorder, gentle acoustic bass and very light hand percussion, cozy anticipation and mischievous charm. 76 BPM, 6/8 meter, D minor with occasional warm F major colors. Small intimate ensemble, natural wooden acoustic timbres, moderate narrow dynamics, minimal melodic density, suitable beneath reading and conversation. No vocals, no choir, no speech, no electronic drums, no trailer impacts. About two minutes. Stable loop friendly texture, no grand intro, no breakdown, no climax, no fade out.
```

## 80. music_table_a — Обычный стол A

**Режим:** Instrumental · **Цель:** 120 с · **Отобрать вариантов:** 2 · **Этап:** P0

**Когда:** Мирные фазы: дверь, добыча, подготовка.

```text
Instrumental acoustic fantasy background music for a humorous card game in a cozy underground tavern. Sparse lute figures, occasional warm recorder answers, soft acoustic bass, long breathing spaces and subtle harmonic movement, calm concentration with a sly smile. 72 BPM, 6/8 meter, D minor with occasional warm F major colors. Small intimate ensemble, natural wooden acoustic timbres, moderate narrow dynamics, minimal melodic density, suitable beneath reading and conversation. No vocals, no choir, no speech, no electronic drums, no trailer impacts. About two minutes. Stable loop friendly texture, no grand intro, no breakdown, no climax, no fade out.
```

## 81. music_table_b — Обычный стол B

**Режим:** Instrumental · **Цель:** 120 с · **Отобрать вариантов:** 2 · **Этап:** P1

**Когда:** Чередование с A между боями.

```text
Instrumental acoustic fantasy background music for a humorous card game in a cozy underground tavern. Muted plucked strings and low recorder phrases, gentle acoustic bass, understated wooden percussion, a different memorable but unobtrusive motif, relaxed cunning. 72 BPM, 6/8 meter, D minor with occasional warm F major colors. Small intimate ensemble, natural wooden acoustic timbres, moderate narrow dynamics, minimal melodic density, suitable beneath reading and conversation. No vocals, no choir, no speech, no electronic drums, no trailer impacts. About two minutes. Stable loop friendly texture, no grand intro, no breakdown, no climax, no fade out.
```

## 82. music_combat — Бой

**Режим:** Instrumental · **Цель:** 120 с · **Отобрать вариантов:** 2 · **Этап:** P0

**Когда:** Подтверждённое начало боя.

```text
Instrumental acoustic fantasy background music for a humorous card game in a cozy underground tavern. Nimble muted lute ostinato, low recorder and bassoon accents, restrained hand drum pulse, playful uncertainty and tactical tension, steady low intensity throughout. 96 BPM, 6/8 meter, D minor with occasional warm F major colors. Small intimate ensemble, natural wooden acoustic timbres, moderate narrow dynamics, minimal melodic density, suitable beneath reading and conversation. No vocals, no choir, no speech, no electronic drums, no trailer impacts. About two minutes. Stable loop friendly texture, no grand intro, no breakdown, no climax, no fade out.
```

## 83. music_final — Решающий бой

**Режим:** Instrumental · **Цель:** 120 с · **Отобрать вариантов:** 2 · **Этап:** P1

**Когда:** Бой за возможный победный уровень, вычисленный по правилам.

```text
Instrumental acoustic fantasy background music for a humorous card game in a cozy underground tavern. Use nimble lute patterns, low recorder, soft acoustic bass and restrained hand drums, a slightly tighter repeating motif and darker suspended harmonies, controlled suspense for a decisive tabletop confrontation. 96 BPM, 6/8 meter, D minor with occasional warm F major colors. Small intimate ensemble, natural wooden acoustic timbres, moderate narrow dynamics, minimal melodic density, suitable beneath reading and conversation. No vocals, no choir, no speech, no electronic drums, no trailer impacts. About two minutes. Stable loop friendly texture, no grand intro, no breakdown, no climax, no fade out.
```

## 84. music_results — После партии

**Режим:** Instrumental · **Цель:** 120 с · **Отобрать вариантов:** 2 · **Этап:** P1

**Когда:** Экран результатов после финального джингла.

```text
Instrumental acoustic fantasy background music for a humorous card game in a cozy underground tavern. Warm relaxed lute and recorder, very sparse gentle hand percussion, satisfied humorous afterglow, soft conclusive mood with no repeated fanfares. 72 BPM, 6/8 meter, D minor with occasional warm F major colors. Small intimate ensemble, natural wooden acoustic timbres, moderate narrow dynamics, minimal melodic density, suitable beneath reading and conversation. No vocals, no choir, no speech, no electronic drums, no trailer impacts. About two minutes. Stable loop friendly texture, no grand intro, no breakdown, no climax, no fade out.
```

## 85. ambient_room — Тихий зал

**Режим:** Loop · **Цель:** 60 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Постоянная основа таверны.

```text
60 seconds. Cozy small underground wooden tavern room tone, soft diffuse air movement and faint low room resonance. No people, no voices, no chatter, no footsteps, no discrete foreground events, no music. Understated natural acoustic fantasy game ambience. Seamless continuous loop, consistent quiet intensity, no beginning gesture, no ending gesture, no fade in or fade out.
```

## 86. ambient_fire — Камин

**Режим:** Loop · **Цель:** 45 с · **Отобрать вариантов:** 1 · **Этап:** P0

**Когда:** Независимый слой камина.

```text
45 seconds. A small steady fireplace heard from several meters away, low warm flame movement, sparse soft wood crackles, no loud pops, no wind, no voices, no music. Understated natural acoustic fantasy game ambience. Seamless continuous loop, consistent quiet intensity, no beginning gesture, no ending gesture, no fade in or fade out.
```

## 87. ambient_crockery — Посуда вдали

**Режим:** One Shot · **Цель:** 4 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Редкие вставки поверх зала.

```text
4 seconds. One quiet distant ceramic mug placed on a wooden counter with a tiny dish clink, soft natural indoor room reflection. Single isolated event, no people, no speech, no music, no continuous background. Understated natural acoustic fantasy game ambience. Clean onset and natural short decay, no long silence.
```

## 88. ambient_dungeon — За дверью

**Режим:** Loop · **Цель:** 60 с · **Отобрать вариантов:** 1 · **Этап:** P1

**Когда:** Тихий дополнительный слой при подземелье/бое.

```text
60 seconds. A quiet stone corridor beyond a closed tavern door, low soft air movement, very sparse distant tiny water droplets, mild roomy resonance, no monsters, no voices, no footsteps, no music, no dramatic wind. Understated natural acoustic fantasy game ambience. Seamless continuous loop, consistent quiet intensity, no beginning gesture, no ending gesture, no fade in or fade out.
```
