/* =====================================================================
   Fight Companion — baked data. THE REFRESH EDITS ONLY THIS FILE.
   Shapes are documented in CLAUDE.md ("Baked data blocks"). The containers
   (FIGHTERS, MATCHUPS, ...) and helpers like norm() are declared in app.js,
   which loads first; the page boots after this file runs.
   ===================================================================== */
const ANALYSIS_STAMP = "October 15, 2026";

/* ============ FIGHTER PROFILES — UFC Vegas 121 (Sep 26, APEX) ============ */
Object.assign(FIGHTERS, {
  raulrosasjr: { name: "Raul Rosas Jr.", nick: "El Ni\u00f1o Problema", age: 21, country: "Mexico", style: "Relentless grappler — takedowns, back-takes, smothering top control", strengths: [
    "Youngest fighter ever signed by the UFC (17) and youngest to win in it — still just 21 with 13 pro fights",
    "Five-fight win streak, capped by out-working veteran Rob Font in March",
    "Suffocating back-take game — most of his wins never reach the judges"],
    weaknesses: ["His lone loss (Christian Rodriguez, 2023) exposed cardio and striking gaps when the takedowns stalled", "First five-round fight, against the most experienced opponent of his life"],
    history: "The Mexican prodigy who signed with the UFC at 17 has grown up on camera and quieted the doubters with a five-fight streak. Beating Rob Font was his stated 'test passed with flying colors.' <b>Now, at 21, he gets his first main event — win it and the top 10 comes calling.</b>" },
  raonibarcelos: { name: "Raoni Barcelos", nick: "", age: 39, country: "Brazil", style: "Nova Uni\u00e3o veteran — BJJ black belt with crisp, heavy boxing", strengths: [
    "Five-fight win streak over serious names: Cody Garbrandt, prospect Payton Talbott, Ricky Simon and Montel Jackson — two of whom fight on this same card",
    "Complete game: knockout power, elite jiu-jitsu, 27 pro fights of craft"],
    weaknesses: ["39 years old — eighteen years older than Rosas", "Went 1-4 in a mid-career skid before this late-career revival"],
    history: "In the UFC since 2018, Barcelos looked finished after a 1-4 stretch — then rattled off five straight wins, including snapping the hype of Payton Talbott and starching ex-champ Cody Garbrandt. <b>At 39, in his first UFC main event, he's the seasoned gatekeeper standing between Rosas and the rankings.</b>" },
  monteljackson: { name: "Montel Jackson", nick: "Quik", age: 34, country: "USA", style: "Long southpaw bantamweight with rare one-punch KO power", strengths: [
    "Freakish physical tools for 135 — 18-second and 20-second knockouts on his recent record",
    "Strong takedown defense and underrated wrestling"],
    weaknesses: ["His long win streak was snapped by Raoni Barcelos — the man headlining this card", "Low output in slow fights has cost him decisions before"],
    history: "A quietly excellent bantamweight for years, Jackson put together one of the division's longest active win streaks before Barcelos out-pointed him. <b>This meeting of Barcelos' last two victims decides who stays in the top-15 hunt.</b>" },
  rickysimon: { name: "Ricky Simon", nick: "", age: 33, country: "USA", style: "Relentless chain-wrestler with a gas tank for days", strengths: [
    "Elite takedown volume — grinds opponents into the mat round after round",
    "30 pro fights of experience; has beaten contenders like Song Yadong (2023) and Raphael Assuncao"],
    weaknesses: ["Alternating wins and losses since 2023 — also beaten by Barcelos during this stretch", "Can be out-struck at range while hunting takedowns"],
    history: "Once knocking on the top five, Simon has spent two years fighting to stay relevant. <b>A statement win over Jackson's power puts one of them back in the rankings conversation; a loss likely means gatekeeper status for good.</b>" },
  rinyanakamura: { name: "Rinya Nakamura", nick: "Hybrid", age: 31, country: "Japan", style: "World-class freestyle wrestler with fast, heavy hands", strengths: [
    "Decorated international wrestling pedigree — among the best pure athletes at 135",
    "Won the Road to UFC bantamweight tournament; 3-1 in the UFC with a first-round TKO of Nathan Fletcher in his last outing"],
    weaknesses: ["Fought just once since 2024 — momentum stalled by layoffs", "Suffered his first career loss in 2024 when his wrestling was neutralized"],
    history: "Japan's biggest bantamweight hope came through the Road to UFC tournament unbeaten and looked destined for a fast rise before injuries and layoffs slowed him. <b>This long-delayed matchup with Hiestand was first booked in 2024 — now both finally get their answer.</b>" },
  bradyhiestand: { name: "Brady Hiestand", nick: "Bam Bam", age: 27, country: "USA (Spokane, WA)", style: "Gritty pressure fighter — grinding clinch work and submissions", strengths: [
    "Won his last fight by submission with a Performance of the Night bonus (Garrett Armfield, 2024)",
    "TUF 29 finalist toughness; 3-1 inside the UFC"],
    weaknesses: ["Over two years on the sidelines — enormous rust question", "A massive athletic gap against Nakamura's world-class wrestling"],
    history: "The TUF 29 runner-up finally strung UFC wins together, then vanished for two-plus years with injuries. <b>He returns straight into the fight that fell through in 2024 — the toughest possible welcome back.</b>" },
  mehemmedeliosmanli: { name: "Mehemmedeli Osmanli", nick: "", age: 22, country: "Azerbaijan", style: "Flashy, brash submission ace — finishes from everywhere", strengths: [
    "Won his TUF 34 semifinal with a buggy choke — a first in the show's history — after calling the finish beforehand",
    "12-1 at just 22, with two-division regional titles and wins over unbeaten fighters in UAE Warriors"],
    weaknesses: ["Showboating confidence can leak defense against a disciplined wrestler", "Faces a training-camp teammate — both were Team Bisping picks, which can make for cautious fights"],
    history: "Azerbaijan's showman tore through The Ultimate Fighter 34 with a first-round rear-naked choke and the show's first-ever buggy choke. <b>Now he fights his own TUF teammate for the contract and the six-figure spotlight.</b>" },
  ilimbekakylbekuulu: { name: "Ilimbek Akylbek Uulu", nick: "", age: 22, country: "Kyrgyzstan", style: "Grinding control wrestler in the Central Asian mold", strengths: [
    "Dominant wrestling carried him through the TUF 34 bracket via hard-nosed decisions",
    "10-3 with a regional title already at 22 — veteran seasoning for his age"],
    weaknesses: ["Wins on control, not damage — close rounds can slip away against a flashier finisher", "Osmanli knows his game intimately from the TUF house"],
    history: "The Kyrgyz grappler out-wrestled everyone Michael Bisping put in front of him on The Ultimate Fighter. <b>The final is teammate-vs-teammate: his blanket wrestling against Osmanli's submission tricks, winner takes the UFC contract.</b>" },
  normadumont: { name: "Norma Dumont", nick: "The Immortal", age: 35, country: "Brazil", style: "Patient boxer-grappler — heavy hands behind a stiff jab, strong in the clinch", strengths: [
    "Ranked #2 at women's bantamweight after a six-fight win streak that made her the division's most consistent contender",
    "Big for the weight class and hard to move — wins the clinch and the cage-wrestling exchanges"],
    weaknesses: ["That streak just ended: Joselyne Edwards upset her on the cards in April", "Deliberate, low-volume pace can hand away close rounds"],
    history: "Dumont has quietly been the most reliable name in a thin division for years, stacking six straight wins before Joselyne Edwards out-worked her in April. <b>At 35 and ranked #2, this co-main is about getting the streak — and the title conversation — back.</b>" },
  ailinperez: { name: "Ailin Perez", nick: "Fiona", age: 31, country: "Argentina", style: "Grinding top-control wrestler with a showman's personality", strengths: [
    "Six straight wins since 2023, most recently a decision over Macy Chiasson in February",
    "Smothering ground control — she takes people down and stays there for fifteen minutes",
    "One of the sport's genuine characters, which has made her a fan favorite"],
    weaknesses: ["Only one finish in that six-fight run — she wins rounds, she doesn't end fights", "Lost her UFC debut in 2022; Dumont is by far the biggest name she has faced"],
    history: "Argentina's breakout women's fighter lost her UFC debut and has not lost since, riding control-heavy decisions to the #4 ranking. <b>Beat Dumont and she is one win from a title shot; it is the biggest fight of her career either way.</b>" },
  rodolfobellato: { name: "Rodolfo Bellato", nick: "Trator", age: 29, country: "Brazil", style: "Bulldozing pressure fighter — forward march, big hooks, heavy top game", strengths: [
    "Genuine one-shot power — stopped Luke Fernandez inside a round in March",
    "Relentless forward pressure that drags opponents into brawls they didn't sign up for"],
    weaknesses: ["Chaotic style leaves him open on the way in", "Bumpy UFC run — a no-contest and a loss in an otherwise promising stretch"],
    history: "Nicknamed 'Tractor' for a reason, Bellato walks people down until something breaks. His UFC spell has been eventful rather than smooth, but the March TKO of Fernandez put him back on track. <b>A thin light heavyweight division means two good wins go a long way.</b>" },
  christianedwards: { name: "Christian Edwards", nick: "Pain", age: 27, country: "USA", style: "Athletic power striker with a wrestling base", strengths: [
    "Started his pro career 5-0 and just stopped previously-unbeaten Glendal Whitney in February",
    "Young for the division at 27, with room to still be improving"],
    weaknesses: ["Rough patch on the regional scene — his Bellator run ended in three straight losses", "Barely any UFC mileage against a heavier hitter"],
    history: "A Bellator product who hit a wall mid-career and rebuilt on the regional circuit, Edwards arrived in the UFC in May 2026. <b>This is his chance to prove the comeback is real against a Brazilian who ends fights early.</b>" },
  yazminjauregui: { name: "Yazmin Jauregui", nick: "", age: 27, country: "Mexico (Tijuana)", style: "High-volume boxer — combinations, pressure, hands never stop", strengths: [
    "Exciting, crowd-pleasing pace — she throws more punches than almost anyone at 115",
    "11-2 with a Mexican fan base that turns out for her"],
    weaknesses: ["Out of action since September 2024 — two years of rust", "Her last fight was a submission loss; grapplers are the puzzle she hasn't solved"],
    history: "The Tijuana boxer burst into the UFC with an instant Fight of the Night in 2022 and looked like Mexico's next star at strawweight, then two setbacks and a long layoff stalled everything. <b>At 27 she's young enough for a full reset — this is the fight that starts it.</b>" },
  vanessademopoulos: { name: "Vanessa Demopoulos", nick: "Lil Monster", age: 37, country: "USA", style: "Scrappy submission hunter — armbars and chaos", strengths: [
    "Four career submission wins and a willingness to attack from anywhere, including off her back",
    "Enormous heart and one of the most likeable personalities on the roster"],
    weaknesses: ["Three-fight losing streak — almost certainly fighting for her roster spot", "Gives up size, speed and volume to almost everyone at 115"],
    history: "A former pole-dancing instructor who talked her way into MMA late, Demopoulos became a cult favorite for her celebrations as much as her armbars. <b>Three straight losses at 37 means this one is very likely do-or-die.</b>" }
});

/* ============ FIGHTER PROFILES — UFC 332 (Oct 3, Salt Lake City) ============ */
Object.assign(FIGHTERS, {
  nataliasilva: { name: "Natalia Silva", ht: 64, nick: "", age: 29, country: "Brazil", style: "Fast, elusive taekwondo-based striker — kicks from everywhere, hard to touch", strengths: [
    "Perfect 8-0 in the UFC, with her last three wins over former champions Jessica Andrade, Alexa Grasso and Rose Namajunas",
    "Blistering speed and footwork — she lands from angles opponents never see and rarely takes damage back"],
    weaknesses: ["Her recent wins have been on points rather than finishes, so she has to bank rounds", "Has never fought five rounds or for a belt"],
    history: "Silva has quietly put together one of the best runs in the division, beating three former champions in a row without losing a round to any of them. <b>Valentina Shevchenko's injury handed her the vacant belt to fight for — one win and the division is hers.</b>" },
  wangcong: { name: "Wang Cong", ht: 66, nick: "The Joker", age: 30, country: "China", style: "Sanda and kickboxing striker — heavy, compact combinations", strengths: [
    "Four-fight win streak, including two wins this year over Eduarda Moura and Tracy Cortez",
    "A decorated kickboxer who owns a win over Valentina Shevchenko under kickboxing rules"],
    weaknesses: ["Far less UFC mileage than Silva and no five-round experience", "Her striking is powerful but flat-footed against the fastest mover in the division"],
    history: "China's best women's flyweight built a four-fight streak that nobody quite noticed until the title picture opened up. <b>She already beat Shevchenko once in kickboxing; now she gets a UFC belt instead.</b>" },
  deivesonfigueiredo: { name: "Deiveson Figueiredo", ht: 65, reach: 68, nick: "Deus da Guerra", age: 38, country: "Brazil", style: "Explosive power puncher with a black-belt submission game", strengths: [
    "Former two-division champion — ruled flyweight, then beat Cody Garbrandt and Marlon Vera on his way to the bantamweight title picture",
    "Genuine one-punch power and a dangerous guillotine, even at 38"],
    weaknesses: ["Lost two straight, to Umar Nurmagomedov and Song Yadong — the division's best wrestlers have his number now", "Fades badly in later rounds and the mileage is enormous"],
    history: "One of the great flyweights of all time moved up to bantamweight and briefly looked like he might do it again, before Umar and Song ended the run. <b>At 38 and on a two-fight skid, this is close to a last stand against the division's brightest prospect.</b>" },
  paytontalbott: { name: "Payton Talbott", ht: 70, reach: 70, nick: "", age: 27, country: "USA (Reno)", style: "Loose, creative striker — unorthodox angles and constant movement", strengths: [
    "Beat former two-division champion Henry Cejudo on the cards in December — by far the biggest win of his career",
    "11-1 with a fanbase drawn to how strange and fluid his striking looks"],
    weaknesses: ["Barely fought in 2026 — a long layoff for a fighter who was supposed to be surging", "His one loss came when a durable pressure fighter dragged him into deep water"],
    history: "The Reno prospect was the most hyped young bantamweight in the sport until a loss and a year of inactivity cooled it, then he out-pointed Cejudo to reset everything. <b>Beating a former champ like Figueiredo puts him back on the fast track.</b>" }
});

/* ============ FIGHTER PROFILES — UFC 331 (Sep 19, Los Angeles) ============ */
Object.assign(FIGHTERS, {
  joshuavan: { name: "Joshua Van", nick: "The Fearless", age: 24, country: "Myanmar (fights out of Houston)", style: "High-volume, forward-pressure boxer with elite pace", strengths: [
    "Champion momentum — TKO'd Pantoja for the belt, then broke Tatsuro Taira with a round-5 TKO in his first defense",
    "Six straight wins including Brandon Royval; among the youngest champions in UFC history",
    "Relentless output that drowns opponents late"],
    weaknesses: ["His title win came in 26 seconds via a freak injury — he hasn't beaten a healthy Pantoja yet", "Pantoja-level grappling is untested territory for his striking-first game"],
    history: "Van fled Myanmar as a teenager, settled in Houston, turned pro at 19, and rocketed up the division with a record activity rate. He became champ at 24 when Pantoja's arm gave out 26 seconds into their title fight, then legitimized the belt against Taira in May. <b>Now he wants to erase the asterisk against the man himself.</b>" },
  alexandrepantoja: { name: "Alexandre Pantoja", nick: "The Cannibal", age: 36, country: "Brazil", style: "Fan-friendly BJJ ace — scrambles, back-takes, rear-naked chokes", strengths: [
    "One of the great flyweight reigns: 4 title defenses (Royval, Kara-France, Erceg, Asakura)",
    "Elite submission grappling — never submitted in his UFC career",
    "Deep five-round championship cardio"],
    weaknesses: ["36 and coming off serious arm/shoulder surgery — first fight back after a 10-month layoff", "Hittable early — has been dropped in title fights"],
    history: "Pantoja grinded for a decade, took the belt from Moreno in 2023 and built one of flyweight's great reigns — until his arm gave out on a fall 26 seconds into the Van fight, ending it without a real contest. He says he's healed. <b>This rematch decides whether the Van era is real or 'The Cannibal' reclaims what injury took.</b>" },
  armantsarukyan: { name: "Arman Tsarukyan", nick: "Ahalkalakets", age: 29, country: "Armenia", style: "Relentless wrestler-grappler with heavy top pressure", strengths: [
    "Five-fight win streak: beat Charles Oliveira, KO'd Dariush in 64 seconds, submitted Dan Hooker in November",
    "Arguably the best pure wrestler at 155 outside Makhachev",
    "Only UFC losses are decisions to Makhachev and Gamrot"],
    weaknesses: ["Infamously withdrew from his title shot the night before with a back injury — and he's been out 10 months", "Vulnerable early to explosive strikers before he settles into wrestling"],
    history: "A former training rival of Makhachev who nearly beat him as a debutant in 2019, Tsarukyan has spent years as the uncrowned #1 contender. His withdrawal from UFC 311 cost him a title shot; he requalified by tapping Hooker. <b>Win this five-rounder and a shot at champion Gaethje is next.</b>" },
  mauricioruffy: { name: "Mauricio Ruffy", nick: "", age: 30, country: "Brazil (Fighting Nerds)", style: "Flashy, explosive Muay Thai knockout artist", strengths: [
    "13 of 14 wins by KO — back-to-back TKOs of Rafael Fiziev and Michael Chandler this year",
    "Viral spinning-back-kick KO of King Green — one-strike power from anywhere"],
    weaknesses: ["Submitted by Benoit Saint Denis in his only UFC loss — exactly the grappling blueprint Tsarukyan uses", "Never fought five rounds; nowhere near this level of wrestling before"],
    history: "The Fighting Nerds striker became one of MMA's most-watched highlight machines in 2025-26. Saint Denis exposed his ground game, but Ruffy rebuilt spectacularly by stopping Fiziev and Chandler back-to-back. <b>Beating Tsarukyan makes him a title challenger and arguably the sport's biggest new star.</b>" },
  patriciopitbull: { name: "Patricio Pitbull", nick: "", age: 39, country: "Brazil", style: "Compact counter-striking power puncher with underrated jiu-jitsu", strengths: [
    "Legendary résumé — former Bellator featherweight AND lightweight champion with the most title-fight wins in that promotion's history",
    "Still carries real one-punch power; beat Dan Ige on the cards last year"],
    weaknesses: ["1-2 in the UFC — outpointed by Yair Rodriguez and old rival Aaron Pico", "39 years old with declining output; loses rounds to inactivity"],
    history: "One of the greatest fighters to ever compete outside the UFC, Pitbull finally jumped over in 2025 at age 37 and it's been bumpy. <b>At 39, a loss to Choi could end his relevance; a win keeps a top-15 push alive.</b>" },
  doohochoi: { name: "Dooho Choi", nick: "The Korean Superboy", age: 35, country: "South Korea", style: "Southpaw counter-puncher with fast hands and vicious body shots", strengths: [
    "Three-fight win streak, capped by a body-shot TKO of Daniel Santos in May",
    "Six career UFC performance bonuses — a proven finisher",
    "Looks physically rejuvenated after Korean military service"],
    weaknesses: ["Was stopped in the losses of his old skid (Stephens, Volkanovski) — durability against power is a question", "35 with long inactivity gaps in his prime"],
    history: "Choi became a cult hero after his 2016 Fight of the Year war with Cub Swanson, then lost three straight and disappeared into military service. His comeback since 2024 has been a feel-good story — three straight violent wins. <b>Beating a legend like Pitbull completes the redemption arc.</b>" },
  renatomoicano: { name: "Renato Moicano", nick: "Money", age: 37, country: "Brazil", style: "Rangy jab-heavy kickboxer with elite ground grappling", strengths: [
    "Rebounded from his skid with a submission of Chris Duncan in an April main event",
    "Big-fight experience — stepped up on one day's notice to fight Makhachev for the title",
    "Great jab and strong submission defense"],
    weaknesses: ["Historically folds against elite pressure and finishers (Ortega already submitted him once)", "37 years old"],
    history: "A longtime contender as famous for his mic work ('I love money!') as his jab. Ortega guillotined him back in 2017 in a fight Moicano was winning — <b>a loss he's wanted back for nearly a decade. Now he gets the rematch with both men aging out of second chances.</b>" },
  brianortega: { name: "Brian Ortega", nick: "T-City", age: 35, country: "USA (Los Angeles — hometown fight)", style: "Iron-chinned pressure fighter with elite, inventive jiu-jitsu", strengths: [
    "One of the best submission artists in UFC history — finished Moicano and the Korean Zombie, nearly tapped Volkanovski",
    "Legendary toughness; moving up to 155 ends the brutal weight cuts that visibly drained him"],
    weaknesses: ["Lost 4 of his last 5, most recently a clear decision to Aljamain Sterling", "Absorbs enormous damage — porous striking defense", "Giving up size in a new division"],
    history: "The former featherweight title challenger from San Pedro was once undefeated and finished everyone. Title losses and injuries derailed him. <b>Now debuting at lightweight in his hometown against the man he submitted in 2017 — win and he has one more run; lose and the retirement talk gets loud.</b>" },
  alonzomenifield: { name: "Alonzo Menifield", nick: "Atomic", age: 38, country: "USA", style: "Explosive power-wrestling athlete; front-loaded knockout aggression", strengths: [
    "Just scored a massive upset KO of hyped finisher Zhang Mingyang in May",
    "Proven prospect-killer — wins over Dustin Jacoby, Paul Craig, Oumar Sy"],
    weaknesses: ["Career-long cardio fade after round one, and he's 38", "Inconsistent — has alternated wins and losses for years"],
    history: "A UFC action fighter for eight years, Menifield looked done before flatlining Zhang Mingyang in one of 2026's biggest upsets. <b>He's now the veteran gate in front of the UFC's next big light heavyweight prospect — and he just proved he ends hype trains.</b>" },
  iwobaraniewski: { name: "Iwo Baraniewski", nick: "Rudy", age: 27, country: "Poland", style: "Aggressive power striker — 3-0 in the UFC, all knockouts", strengths: [
    "Perfect 9-0; KO'd Ibo Aslan, Austen Lane and Junior Tafa with a bonus in every UFC appearance",
    "Youth, size and momentum in a thin division"],
    weaknesses: ["Zero rounds against ranked competition — Menifield is a massive step up in power", "Chin untested against a genuine one-punch KO artist"],
    history: "The Polish 27-year-old blasted through the Contender Series in 2025 and then through three UFC opponents in bonus-winning fashion. <b>Survive Menifield's early storm and he likely enters the rankings</b> — but Menifield just ended an identical hype train in May." }
});
FIGHTERS.patriciofreire = FIGHTERS.patriciopitbull; // ESPN sometimes lists him by his real surname
/* ============ MATCHUP NOTES ============ */
Object.assign(FIGHTERS, {
  sedriquesdumas: { name: "Sedriques Dumas", ht: 75, reach: 79, nick: "The Reaper", age: 31, country: "USA", style: "Long, rangy kickboxer with a wrestling base — 6-foot-3 with a 79-inch reach", strengths: [
      "Size: he is built like a light heavyweight, which is partly why this fight moved up to 205 pounds",
      "Real power when he commits — four of his ten wins are knockouts, and he starts fast",
      "Awkward, unpredictable rhythm that has given better-credentialed opponents trouble early"],
    weaknesses: [
      "Durability: all five of his UFC losses came by stoppage, usually once he tired or got hit clean",
      "Fades — fights start bright and unravel by round two",
      "Consistency, in and out of the cage; a long, well-publicized arrest record made this booking a tabloid story"],
    history: "Florida product who came through Dana White's Contender Series in 2022 and has been in the UFC since 2023 — but it hasn't gone well: <b>3-5 with a no contest in the UFC, three straight losses, 1-5 in his last six</b>. He was booked against Mickey Gall at middleweight; Gall pulled out, a short-notice debutant stepped in, and the fight moved to light heavyweight. This looks very much like his last chance to keep his job." },
  luishernandez: { name: "Luis Hernandez", ht: 69, reach: 73.5, nick: "The Stache", age: 30, country: "USA", style: "Compact, aggressive finisher — jiu-jitsu brown belt, heavy kicks, hunts the back", strengths: [
      "8-0 with eight finishes (five submissions, three knockouts) — nobody has heard a final bell against him",
      "Rear-naked choke specialist: that is how he won his UFC contract two weeks ago",
      "Fearless of size — he is 5-foot-9 and just choked out a 6-foot-4 Frenchman on the Contender Series"],
    weaknesses: [
      "Short notice and a big step up: this is his UFC debut, eleven days after his last fight",
      "Giving up six inches of height and reach — Dumas can keep him on the end of punches",
      "His eight opponents were regional-level; the UFC is a different tier"],
    history: "A full-time Miami-Dade sheriff's deputy — <b>the first active-duty police officer to fight in the UFC</b>. Owns one of the fastest knockouts in MMA history (a head kick a few seconds in, on the Florida regional scene) and a regional 185-pound belt. Won his UFC deal on Sep 15 by choking out Hugo Guillon on Dana White's Contender Series, then took this fight on short notice when Mickey Gall pulled out. The cop-vs-ex-con angle went viral, and the UFC leaned into it by putting the fight on the main card." },
  melissaamaya: { name: "Melissa Amaya", ht: 64, reach: 64, nick: "Mamba", age: 31, country: "USA", style: "Two-way finisher — pressure boxing with a slick submission game underneath", strengths: [
      "8-0 with five straight finishes: TKO'd Giovanna Canuto and choked out Anna Melisano to reach the final",
      "Beat the tournament's No. 1 seed in the show's very first fight — already the upset story of the season",
      "Composure and cardio: a full-time nurse who trains nights at Sikjitsu in Spokane"],
    weaknesses: [
      "Eight pro fights and never fought amateur — Machado has more than twice the experience",
      "The market makes her a +190 underdog; it expects veteran savvy to win the rounds",
      "Has not yet faced someone who stays calm when the fight hits the mat"],
    history: "From Chaparral, New Mexico; a University of New Mexico nursing grad (2018) who moved to Spokane, Washington and works at a dental clinic between training sessions. Skipped the amateur ranks entirely, turned pro and has never lost. A Daniel Cormier pick on The Ultimate Fighter 34, she beat the top seed in episode one and finished her way to the final — <b>against her own teammate</b>. The winner gets the UFC contract." },
  valescamachado: { name: "Valesca Machado", ht: 64, reach: 63, nick: "Tina Black", age: 30, country: "Brazil", style: "Experienced Muay Thai striker — orthodox, walks forward, wins rounds", strengths: [
      "Nineteen pro fights of experience against Amaya's eight — she has seen everything",
      "Former Invicta FC strawweight champion; beat current UFC fighter Julia Polastri back in Brazil",
      "Four-fight win streak, and the market's -230 favorite for a reason"],
    weaknesses: [
      "Low output — around 2.4 significant strikes a minute, so a busier opponent can steal rounds",
      "Has been finished before, and Amaya's submissions are the live danger",
      "Teammate fight: both were Cormier picks, so Amaya knows her game as well as she knows Amaya's"],
    history: "Turned pro in Brazil in 2016, went 8-2 on the regional scene, then won the Invicta FC strawweight belt — the best women's promotion outside the UFC. Took the Ultimate Fighter route to a contract at 30, came through Team Cormier's bracket with two wins, and now fights her own teammate for it. Oddsmakers expect her to out-point Amaya over three rounds." }
});

Object.assign(FIGHTERS, {
  kinggreen: { name: "King Green", ht: 70, reach: 71, nick: "", age: 40, country: "USA", style: "Slick, hands-down counter boxer — the shoulder-roll defense, a stiff jab, and a surprising wrestling option", strengths: [
      "Hard to hit clean: slips and rolls punches better than almost anyone at 155, even at 40",
      "On the best run of his career — four straight wins, three by finish (Zellhuber, Stephens, McKinney)",
      "Underrated wrestling: takedowns beat Ribovics twice, and Green shoots far more often than the Argentine does"],
    weaknesses: [
      "Age — he is 40 and fighting for the fourth time this year; the chin has been cracked before",
      "Low kicks: the hands-down style leaves his lead leg open, and Ribovics kicks hard",
      "Can coast and talk his way into losing close rounds"],
    history: "Formerly Bobby Green — he legally changed his name to King in 2024. A UFC fixture since 2013, forever the entertaining gatekeeper, until this late-career surge: <b>four straight wins at 39 and 40</b> with a knockout of Jeremy Stephens and a stoppage of Terrance McKinney. A win here, in his home-state-adjacent Mountain time zone, would put him on the edge of the top 15 for the first time in years." },
  estebanribovics: { name: "Esteban Ribovics", ht: 70, reach: 69, nick: "El Gringo", age: 30, country: "Argentina", style: "High-volume kickboxer — hard low kicks set up hooks, and he never stops coming forward", strengths: [
      "Pace and output — three Fight of the Night bonuses in his last seven, and he is coming off a knockout of Edson Barboza in August",
      "Kicks: he chops the lead leg early and it changes the whole fight",
      "Durable and happy in a brawl — he has never been knocked out"],
    weaknesses: [
      "Wrestling defense: two of his three UFC losses came to grapplers who took him down (Gamrot submitted him in April)",
      "Missed weight by half a pound — forfeits 20 percent of his purse and can't earn a bonus tonight",
      "Can be out-boxed by a sharper counter-puncher when the brawl doesn't materialize"],
    history: "Argentina's best lightweight and a cult favorite for his all-action fights. 16-3 overall, 5-2 in the UFC, with a Fight of the Year contender against Daniel Zellhuber in 2024 and a stoppage of Barboza at UFC 330 in August. Lost to Mateusz Gamrot by submission in April — the grappling hole is still the question. Came in heavy at Friday's weigh-in, so the fight goes ahead at a catchweight." },
  robertosoldic: { name: "Roberto Soldic", ht: 71, reach: 73, nick: "Robocop", age: 31, country: "Croatia", style: "Explosive knockout artist — compact power in both hands, hunts the finish from the opening bell", strengths: [
      "Power: 18 of his 21 wins are knockouts, eleven of them in round one",
      "Pedigree — a two-division KSW champion (welterweight twice, middleweight once), the biggest European promotion outside the UFC",
      "Has beaten Dricus du Plessis, the former UFC middleweight champ, in a 2018 rematch"],
    weaknesses: [
      "Rust: this is his first MMA fight in 19 months, after a stop-start spell in ONE Championship",
      "UFC debut nerves plus a 7,000-foot elevation drop into Salt Lake City — cardio is the unknown",
      "Wrestlers have bothered him before; he would rather stand and trade"],
    history: "Bosnian-born Croatian, 21-4, and for years the best welterweight not in the UFC. Ruled KSW, then had a frustrating run in ONE Championship (a no contest, cancelled bouts) before <b>finally signing with the UFC in September on short notice</b>. Unbeaten in seven. Debuts against a fellow puncher, so it should not take long either way." },
  khaoswilliams: { name: "Khaos Williams", ht: 72, reach: 77, nick: "The Oxfighter", age: 32, country: "USA", style: "One-punch right hand — a sprinter's start, with eight first-round finishes", strengths: [
      "Early power: nine of his 16 wins are knockouts, eight of them in round one",
      "Six-foot frame with a 77-inch reach — he is the longer man here",
      "Snapped a two-fight skid with a first-round TKO of Nikolay Veretennikov in May"],
    weaknesses: [
      "Fades badly when it goes past round one; his output drops off a cliff",
      "Lost two of his last three — a decision to Andreas Gustafsson and a submission to Gabriel Bonfim",
      "Tends to wait for the one big shot and gets out-worked in between"],
    history: "Detroit-area knockout artist who announced himself with 27-second and 30-second KOs in his first two UFC fights back in 2020. Since then: streaky — big wins, then flat decision losses. 16-5 overall, 7-4 in the UFC. Against Soldic the first round is everything: both men are at their most dangerous in the opening minutes." },
  romankopylov: { name: "Roman Kopylov", ht: 72, reach: 75, nick: "", age: 34, country: "Russia", style: "Southpaw kickboxer — body kicks, counter left hand, and a chin that has never been cracked", strengths: [
      "Durability: 20 pro fights and he has never been stopped by strikes — his five losses are decisions and submissions",
      "Twelve knockouts in 15 wins; the left hand and body kicks are real weapons",
      "The more proven man by far — a former Fight Nights Global champion who has fought ranked UFC middleweights"],
    weaknesses: [
      "Giving up four inches of height and six of reach to a 24-year-old who is still growing into his frame",
      "Lost three of his last five, all decisions, to Costa, Rodrigues and Imavov-level pressure",
      "Starts slowly and lets rounds slip away early"],
    history: "Russian striker, 15-5, who has been the UFC's middleweight measuring stick for a few years: good enough to knock out mid-tier opposition, not quite good enough against the top ten. Beat Marco Tulio by decision in May to stop a two-fight slide. Tonight he is the <b>step-up test for a prospect everyone is talking about</b> — and the man most likely to spoil the coronation if the kid gets wild." },
  atebagautier: { name: "Ateba Gautier", ht: 76, reach: 81, nick: "The Storm", age: 24, country: "Cameroon", style: "Huge, athletic switch-stance striker — 6-foot-4 with an 81-inch reach and fight-ending power", strengths: [
      "Finishing: 9 of his 11 wins by knockout, seven in the first round; four KOs in five UFC wins",
      "Size and reach that nobody at middleweight can match — he fights like a light heavyweight",
      "Nine straight wins and still improving every time out; he is only 24"],
    weaknesses: [
      "Biggest step up of his career against a durable, experienced veteran who has never been knocked out",
      "Raw: when the first-round blitz doesn't land he has had to go the distance (Pulyaev) and looked human",
      "Gas tank over three hard rounds is still unproven at this level"],
    history: "From Yaounde, Cameroon, trains at Manchester Top Team in England. Won his UFC deal on the 2024 Contender Series, then tore through the division: <b>knockouts of Tre'ston Vines and Ozzy Diaz, a decision over Andrey Pulyaev</b>. 11-1, nine straight wins, and the most talked-about young middleweight in the sport. Kopylov is the test that tells us whether the hype is real." }
});

Object.assign(FIGHTERS, {
  brendanallen: { name: "Brendan Allen", ht: 74, reach: 75, nick: "All In", age: 30, country: "USA", style: "Submission grappler — chains takedowns until one lands, then hunts the back", strengths: [
      "Finishing on the mat: most of his wins are submissions, usually the rear-naked choke",
      "Relentless takedown chains — he keeps shooting until he gets the fight where he wants it",
      "On a three-fight run over Marvin Vettori, Reinier de Ridder and Edmen Shahbazyan, two of them Fight of the Night"],
    weaknesses: [
      "Giving up four inches of reach to a better kickboxer — the first round on the feet is dangerous for him",
      "Can get dragged into brawls he doesn't need, which is how both Fight of the Night bonuses happened",
      "Has been finished by strikes before when he stayed in the pocket too long"],
    history: "A former LFA middleweight champion who has been in the UFC since 2019 and is now <b>ranked in the top five</b>. Quietly one of the most active contenders in the division, and he has beaten everyone the UFC has put in front of him lately. A win over a rising striker would put him one or two fights from a title shot." },
  christianleroyduncan: { name: "Christian Leroy Duncan", ht: 74, reach: 79, nick: "CLD", age: 31, country: "England", style: "Long, switch-stance Muay Thai striker — kicks, knees and spinning shots at range", strengths: [
      "Five straight wins, including former title challenger Jared Cannonier and Roman Dolidze",
      "Out-struck Cannonier 68 to 15 in July — his range striking is a real problem for anyone who can't close the distance",
      "Four inches of reach on Allen, and ten of his 15 wins are knockouts"],
    weaknesses: [
      "Has never faced a grappler as dogged as Allen; his takedown defense is the big unknown",
      "First UFC main event and first time scheduled for five rounds",
      "Can get flashy (spinning backfists) and leave openings to be clinched"],
    history: "A former two-time Cage Warriors champion from London who came to the UFC in 2023 and is <b>15-2 with five wins in a row</b>, the last three over increasingly big names. Now ranked around No. 10 at middleweight. This is his first main event, and the classic question: can the striker keep a top grappler off him for 25 minutes?" }
});

Object.assign(FIGHTERS, {
  loopygodinez: { name: "Loopy Godinez", ht: 62, reach: 61, nick: "Loopy", age: 33, country: "Mexico", style: "High-pace pressure fighter — wrestling, cage work and non-stop volume", strengths: [
      "Pace: she pushes a tempo few strawweights can match for three rounds",
      "Wrestling and top control that win close rounds on the cards",
      "Experience — 15 UFC fights since 2021, with wins over Jessica Andrade and Tabatha Ricci"],
    weaknesses: [
      "Small for the division at 5-foot-2 with a 61-inch reach",
      "Only one knockout in 14 wins, so she has to grind for decisions",
      "Coming off a loss to top wrestler Tatiana Suarez in April"],
    history: "Mexican-born, Canadian-raised, and one of the busiest fighters on the roster. A former LFA champion, she has worked her way into the top 15 by out-hustling people. A clean win here keeps her in the mix after the Suarez setback." },
  ketlensouza: { name: "Ketlen Souza", ht: 63, reach: 63, nick: "Esquentadinha", age: 31, country: "Brazil", style: "Aggressive Brazilian striker with real finishing power and a submission game", strengths: [
      "Can end it with one shot — she knocked out Ariane Carnelossi with a head kick in June",
      "On a two-fight win streak, the longest of her UFC run",
      "Former Invicta FC champion; dangerous in scrambles too"],
    weaknesses: [
      "Struggles when a wrestler keeps her pinned to the cage",
      "4-3 in the UFC, with two split-decision losses where she was out-worked",
      "Can fade if she loads up early and misses"],
    history: "Her nickname means \"hothead\" in Portuguese, which tells you how she fights. Came through Invicta, where she held a title, and has been up and down in the UFC. Two straight wins have her knocking on the top 15; a win over a ranked name like Godinez would get her in." },
  andrefili: { name: "Andre Fili", ht: 71, reach: 74, nick: "Touchy", age: 36, country: "USA", style: "Rangy kickboxer from Team Alpha Male — long jab, kicks, decent wrestling", strengths: [
      "Huge experience: 27 UFC fights, more than almost anyone at featherweight",
      "Long, 74-inch reach and a sharp jab to keep shorter men at bay",
      "Durable and crafty; he knows how to win a close round"],
    weaknesses: [
      "Lost his last two, including a TKO by Vinicius Oliveira this summer",
      "Age: 36, with 39 pro fights of wear",
      "Has been finished by strikes when he stays in the pocket"],
    history: "A UFC fixture since 2013, Fili has been the classic featherweight gatekeeper: beats prospects who aren't ready, loses to the ones who are. He is 2-4 since 2024, and at 36 this may be a fight to save his roster spot." },
  kaikamakaiii: { name: "Kai Kamaka III", ht: 67, reach: 69, nick: "The Fighting Hawaiian", age: 31, country: "USA", style: "Compact pressure boxer-wrestler from Hawaii — busy hands, mixes in takedowns", strengths: [
      "Five inches shorter than Fili but strong and hard to knock off his feet",
      "Mixes boxing and wrestling well, so opponents can't sit on one defense",
      "Big-fight experience from Bellator and PFL"],
    weaknesses: [
      "Just got stopped by Luke Riley in July",
      "Gives up a lot of reach and has to walk through the jab to land",
      "His UFC record is 2-3-1; he has never strung wins together here"],
    history: "A Hawaiian who debuted in the UFC in 2020, left for Bellator and PFL, and came back this year. Split-decision win over Dakota Hope in April, then a knockout loss in July. Like Fili, he needs this badly." },
  malcolmwellmaker: { name: "Malcolm Wellmaker", ht: 70, reach: 71, nick: "The Machine", age: 32, country: "USA", style: "Switch-stance knockout puncher — the right hook is the whole story", strengths: [
      "Real one-punch power: three first-round knockouts, including his UFC debut over Cameron Saaiman",
      "Fast starter who is most dangerous in the first two minutes",
      "Fresh start at American Top Team after leaving his longtime Georgia gym"],
    weaknesses: [
      "Lost his last two — a decision to Ethyn Ewing and a submission to Juan Diaz",
      "Can get taken down and held when the knockout doesn't come early",
      "Pressure to win: another loss could cost him his spot"],
    history: "From Augusta, Georgia, and a Contender Series graduate who started his UFC run 2-0 with highlight knockouts and looked like a future contender. Two straight losses followed, so he moved to American Top Team to rebuild. This fight is about finding the old spark." },
  otaritanzilovi: { name: "Otari Tanzilovi", ht: 69, reach: 70, nick: "", age: 28, country: "Georgia", style: "Durable, orthodox all-rounder from the Georgian scene — busy, tough, grinds", strengths: [
      "10-2 overall and only 28",
      "Tough and durable; he went the distance with Shane Collins in his debut",
      "Good wrestling base, which is exactly what has beaten Wellmaker"],
    weaknesses: [
      "0-1 in the UFC after losing a clear decision in his debut",
      "Not a big puncher, so he has to survive Wellmaker's early storm",
      "Has fought at featherweight; cutting to 135 is a question"],
    history: "From Telavi, Georgia (the country), and trains at Guram Fight Club. Signed on the strength of a ten-fight run on the European scene, then lost his debut on the scorecards in June. He is the +190 underdog, but his grappling is the style that gives Wellmaker problems." },
  matheuscamilo: { name: "Matheus Camilo", ht: 70, reach: 69, nick: "Jaguar", age: 25, country: "Brazil", style: "Young, aggressive pressure fighter — heavy hands and a strong grappling base", strengths: [
      "Momentum: two straight wins, most recently a TKO of Nazim Sadykhov as an underdog",
      "Thirteen years younger than his opponent, and getting better every fight",
      "Trains at Xtreme Couture in Las Vegas, with a solid wrestling-and-pressure game"],
    weaknesses: [
      "Has been submitted before (Gauge Green, 2025)",
      "Only three UFC fights; still raw in long fights",
      "Can get careless chasing the finish"],
    history: "A 25-year-old Brazilian who came through the Contender Series and is 3-1 in the UFC, 11-3 overall. The Sadykhov stoppage in June was his breakout. A win over a veteran like Herbert would push him toward ranked opposition." },
  jaiherbert: { name: "Jai Herbert", ht: 73, reach: 77, nick: "Black Country Banger", age: 38, country: "England", style: "Tall, long-limbed kickboxer — sharp straight punches from distance", strengths: [
      "Height and reach: 6-foot-1 is very big for 155, and he uses the range well",
      "Power — he knocked out Mandel Nallo in round one in April",
      "Ten UFC fights of experience against plenty of tough opposition"],
    weaknesses: [
      "Age: 38, facing a fighter 13 years younger",
      "Has been knocked out before when opponents get inside",
      "4-5-1 in the UFC and has never won two in a row there"],
    history: "From Wolverhampton in England's Black Country. A former Cage Warriors champion who has spent five years in the UFC trading wins and losses. Coming off a first-round knockout, he is the +160 underdog against a hungry young Brazilian." }
});

Object.assign(FIGHTERS, {
  joaquinbuckley: { name: "Joaquin Buckley", ht: 70, reach: 76, nick: "New Mansa", age: 32, country: "USA", style: "Explosive southpaw power striker — short, thick, and fast off the mark", strengths: [
      "Fight-ending power in both hands; he owns one of the most famous knockouts ever, a spinning back kick caught on every highlight reel",
      "Long 76-inch reach for a 5-foot-10 man, so he can land from further out than he looks",
      "Big-fight experience: beat Colby Covington in a 2024 main event"],
    weaknesses: [
      "Lost his last two, both decisions, to Kamaru Usman and Sean Brady — wrestlers who kept him on the fence",
      "Fighting in his opponent's home country, in front of a loud Canadian crowd",
      "Can wait too long for the one big shot and lose rounds on volume"],
    history: "A former middleweight who dropped to welterweight in 2023 and went on a six-fight tear, capped by stopping Colby Covington. That earned him a fight with former champ Kamaru Usman, which he lost on the cards, then another decision loss to Sean Brady in May. Now ranked around No. 10, he needs this to stay in the title picture." },
  mikemalott: { name: "Mike Malott", ht: 73, reach: 73, nick: "Proper", age: 34, country: "Canada", style: "Well-rounded Canadian — sharp boxing, a dangerous guillotine, and steady pressure", strengths: [
      "Four straight wins, the last a third-round knockout of Gilbert Burns in his first UFC main event",
      "Home crowd: he's from Ontario and fighting in Edmonton, where the building will be on his side",
      "Finishes everywhere — knockouts and submissions; 7-1 in the UFC"],
    weaknesses: [
      "Three inches shorter in reach than you'd expect for 6-foot-1, so Buckley can match his range",
      "Has been hurt by power punchers before; his one UFC loss came by knockout",
      "Can get drawn into a brawl, which is exactly the fight Buckley wants"],
    history: "A longtime coach at Niagara Top Team who took the long road to the UFC, debuting at 30. Since then he's been one of Canada's best stories: 7-1 in the Octagon, unbeaten since January 2024, and the Burns knockout in April made him a ranked contender. A win over a name like Buckley would put him in the top 10." },
  erinblanchfield: { name: "Erin Blanchfield", ht: 64, reach: 68, nick: "Cold Blooded", age: 27, country: "USA", style: "Elite grappler — relentless takedowns, smothering top control, slick submissions", strengths: [
      "One of the best grapplers in the women's division; she submitted Tracy Cortez last November",
      "Long 68-inch reach for her height, which helps her jab her way into takedowns",
      "Young and still improving at 27, already a former title contender"],
    weaknesses: [
      "Struggles when she can't get the fight to the mat — that's how Manon Fiorot beat her",
      "Three inches shorter than Jasudavicius",
      "Returning from the injury that cancelled this fight's first booking in August"],
    history: "From New York City, a jiu-jitsu prodigy who rose fast in the UFC and lost a title eliminator to Manon Fiorot in 2024. Back-to-back wins since then have her ranked in the top five at flyweight, and a win here should put her next in line for the belt." },
  jasminejasudavicius: { name: "Jasmine Jasudavicius", ht: 67, reach: 68, nick: "", age: 37, country: "Canada", style: "Big, strong flyweight with a wrestling base and steady pressure", strengths: [
      "Size: 5-foot-7 is tall for 125, and she's strong in the clinch",
      "Fighting at home, on the same card as her Niagara Top Team teammate Malott",
      "Bounced back from her loss to Fiorot by out-pointing Karine Silva in April"],
    weaknesses: [
      "Facing a better pure grappler; her takedown defense will be tested every round",
      "Age: 37, against a 27-year-old",
      "Was stopped by Fiorot in the first round last year"],
    history: "A former college soccer player from St. Catharines, Ontario, who took up MMA late and climbed into the flyweight top 10 anyway. 15-4 overall. This is the biggest fight of her career, and a win would make her a real title contender." }
});

/* ============ FIGHTER PROFILES — UFC Edmonton main card (Oct 17, Rogers Place) ============ */
Object.assign(FIGHTERS, {
  kylenelson: { name: "Kyle Nelson", ht: 71, reach: 71, nick: "The Monster", age: 35, country: "Canada", style: "Stand-up veteran — patient kickboxing, likes a long, technical fight", strengths: [
      "Experience: 25 pro fights and years in the UFC against all kinds of styles",
      "Wins rounds on the feet when the fight stays at kicking range",
      "Beat Matt Frevola last October, so the skills are still there"],
    weaknesses: ["Coming off a first-round knockout loss to Terrance McKinney in March", "35, facing a hungry 27-year-old in his debut"],
    history: "A Canadian veteran who has been in and around the UFC for years, with a 17-7-1 record. He looked good beating Matt Frevola last fall, then got caught early by Terrance McKinney in March. A home-country card is a good place to bounce back, but the oddsmakers think the new guy is the real deal." },
  cristianperez: { name: "Cristian Perez", ht: 69, reach: 72, nick: "Puas", age: 27, country: "", style: "Aggressive finisher — long for his size, hunts the stoppage", strengths: [
      "Finishing instinct: stopped Logan Paxton in the second round to earn his contract",
      "Long 72-inch reach for a 5-foot-9 lightweight",
      "Only two losses in 16 pro fights"],
    weaknesses: ["UFC debut — the bright lights are new", "Was stopped in the third round on his first Contender Series try in 2025"],
    history: "A second-chance story. He lost by third-round stoppage on Dana White's Contender Series in 2025, went back to work, and returned this August to stop Logan Paxton in round two and win a UFC contract. Now he debuts as a big favorite." },
  marcandrebarriault: { name: "Marc-Andre Barriault", ht: 73, reach: 74, nick: "Power Bar", age: 36, country: "Canada", style: "Pressure brawler — walks forward, throws heavy hands in volume", strengths: [
      "Real power: 11 of his 17 wins are knockouts",
      "Tough and durable — he's very hard to put away",
      "Huge home-crowd energy as a French-Canadian fan favorite"],
    weaknesses: ["Lost his last fight, a decision to Michal Oleksiejczuk in February", "Can get taken down and held by good grapplers"],
    history: "A longtime UFC middleweight from Quebec and a crowd favorite in Canada, with a 17-11 record built on knockouts and wars. He has had a long run of ups and downs in the UFC. At 36 he's fighting for his spot against a younger grappler." },
  kyledaukaus: { name: "Kyle Daukaus", ht: 75, reach: 76, nick: "The D'Arce Knight", age: 33, country: "USA", style: "Long, slick grappler — chokes from everywhere, especially the D'Arce", strengths: [
      "Submission threat: his nickname comes from the D'Arce choke he loves",
      "Tall and rangy at 6-foot-3 with a 76-inch reach",
      "Comfortable on the mat in scrambles where brawlers get lost"],
    weaknesses: ["Coming off a first-round TKO loss to Bo Nickal in June", "Can be dragged into slugfests he doesn't need"],
    history: "A Philadelphia grappler with a 17-5 record (plus one no contest). He took a tough first-round loss to rising star Bo Nickal in June. Against a brawler, the plan is simple: survive the early heat and find a choke." },
  louisjourdain: { name: "Louis Jourdain", ht: 69, reach: 69, nick: "The Mad Prince", age: 29, country: "Canada", style: "Well-rounded finisher with a sneaky submission game", strengths: [
      "On a four-fight win streak",
      "Earned his UFC contract with a third-round rear-naked choke on the Contender Series",
      "Trains with his older brother Charles, a UFC veteran, at BTT Canada"],
    weaknesses: ["UFC debut", "Three losses already at 9-3 — not unbeatable"],
    history: "From Beloeil, Quebec, and the younger brother of UFC featherweight Charles Jourdain — together, the first Canadian brothers to fight in the UFC. He won his contract on the Contender Series with a late choke. Debuting at home, he's the favorite." },
  timmycuamba: { name: "Timmy Cuamba", ht: 69, reach: 71, nick: "Twilight Timmy", age: 27, country: "USA", style: "Busy striker — half his wins are knockouts, the other half decisions", strengths: [
      "Five knockout wins, and he can go 15 minutes",
      "Longer reach than Jourdain (71 inches)",
      "Has UFC experience; Jourdain doesn't"],
    weaknesses: ["Lost his last fight to Benardo Sopaj by submission in May", "2-3 in the UFC so far"],
    history: "A 27-year-old with a 10-4 record and a 2-3 run in the UFC. His last fight ended in a second-round submission loss. Now he's the road underdog against a debuting hometown prospect — a good spot to play spoiler." },
  mandelnallo: { name: "Mandel Nallo", nick: "", age: 37, country: "Canada", style: "Long, rangy striker who likes a firefight", strengths: [
      "Power and length on the feet",
      "Fighting at home, in Canada",
      "Faces an opponent on a three-fight skid"],
    weaknesses: ["Coming off a first-round TKO loss to Jai Herbert in April", "37 years old"],
    history: "A Vancouver-born lightweight with a 14-4 record (plus one no contest). He was stopped in the first round by Jai Herbert in Winnipeg in April. The oddsmakers still like him big here, against a veteran who's lost three straight." },
  natelandwehr: { name: "Nate Landwehr", ht: 69, reach: 72, nick: "The Train", age: 38, country: "USA", style: "All-action brawler — forward pressure, never stops swinging", strengths: [
      "Pure toughness: his fights are almost always entertaining wars",
      "Pace — he keeps coming for all 15 minutes",
      "Years of experience at featherweight"],
    weaknesses: ["Lost three in a row", "Moving up a weight class to lightweight, against a bigger man"],
    history: "An 18-8 veteran nicknamed \"The Train\" for the way he walks forward. After three straight losses at featherweight, he's moving up to 155 pounds to save his UFC career. Expect a firefight either way." }
});

Object.assign(MATCHUPS, {
  "estebanribovics|kinggreen": { odds: "Ribovics -192, Green +160",
    note: "The fun fight on the card: Green's hands-down counter boxing against Ribovics' relentless kick-and-punch volume. Ribovics should win the activity battle and chop the lead leg; Green wins if he keeps it clean and uses his wrestling, which Ribovics has struggled with twice. Ribovics missed weight by half a pound, so it's a catchweight and he can't earn a bonus. A classic pace-vs-savvy clash." },
  "khaoswilliams|robertosoldic": { odds: "Soldic -238, Williams +195",
    note: "Two of the hardest hitters at 170 with a combined 27 knockouts — and the betting line on the fight ending inside two rounds says the books don't expect judges. Soldic, the two-division European champ, finally debuts after 19 months away; Williams is at his most dangerous in the first 90 seconds. Whoever lands first probably wins." },
  "atebagautier|romankopylov": { odds: "Gautier -258, Kopylov +210",
    note: "Prospect vs proven: Gautier, 24, 6-foot-4 and a finishing machine, against Kopylov, 34, who has never been stopped by strikes in 20 fights. Gautier's size and power should overwhelm most middleweights, but Kopylov's chin and counter left hand are exactly the kind of test that exposes a raw talent. Opens the main card." },
  "brendanallen|christianleroyduncan": { odds: "Allen -145, Duncan +120 — the line flipped toward Allen after opening near even",
    note: "Classic grappler-vs-striker over five rounds, with a top-five spot on the line. Duncan wants it at kicking range, where he just made Cannonier look slow. Allen wants it on the mat, where almost nobody at middleweight survives his back-takes. The first two rounds tell you everything: if Allen gets a takedown early, it's his fight; if Duncan stuffs a few and lands his knees and kicks, the underdog is very live." },
  "ketlensouza|loopygodinez": { odds: "Godinez -235, Souza +185",
    note: "Souza missed weight by a pound on Friday, so it's a catchweight and 20 percent of her purse goes to Godinez. The co-feature at strawweight. Godinez is one of the busiest women in the UFC — 15 fights since 2021, with wins over Jessica Andrade and Tabatha Ricci — bouncing back from a loss to Tatiana Suarez. Souza is on a two-fight win streak and trying to crack the top 15. Godinez's pace and wrestling should be too much, but Souza has finishing power." },
  "andrefili|kaikamakaiii": { odds: "Fili -150, Kamaka +120",
    note: "A crossroads fight at featherweight. Fili, 35, has 27 UFC fights but has lost his last two and is 2-4 since 2024. Kamaka is 1-1 since coming back to the UFC and was stopped by Luke Riley last time. Experience against a hungrier man; the loser may be fighting for his job." },
  "malcolmwellmaker|otaritanzilovi": { odds: "Wellmaker -230, Tanzilovi +190",
    note: "Wellmaker was a hyped bantamweight knockout artist — three first-round KOs with his right hook — until two straight losses. He has moved to American Top Team to reset. Tanzilovi lost his UFC debut and needs a win too. If Wellmaker's power is still there, it probably ends early." },
  "jaiherbert|matheuscamilo": { odds: "Camilo -195, Herbert +160",
    note: "Momentum vs experience at lightweight. Camilo has won two straight, most recently a TKO of Nazim Sadykhov as an underdog. Herbert is a British veteran with ten UFC fights who has never strung together a winning streak. Camilo's pressure should carry it if he respects Herbert's power early." },
  "renatomoicano|tomnolan": { odds: "Lines not posted at write-up time",
    note: "Moicano is a veteran with sharp boxing and a strong back-take game, ranked in the lightweight top 15. Nolan is a tall Australian on a five-fight streak getting his first real step up. Experience against momentum; full breakdown closer to the date." },
  "loneerkavanagh|ramazantemirov": { odds: "Lines not posted at write-up time",
    note: "UFC 333 main card, flyweight: England's Lone'er Kavanagh against Uzbekistan's Ramazan Temirov, two of the more dangerous young names at 125. Breakdowns get written closer to the date." },
  "alexandervolkov|rizvankuniev": { odds: "Lines not posted at write-up time",
    note: "UFC 333 main card, heavyweight: veteran contender Alexander Volkov against the unbeaten-style Dagestani prospect Rizvan Kuniev. Breakdowns closer to the date." },
  "aaronpico|losenekeita": { odds: "Lines not posted at write-up time",
    note: "UFC 333 main card, featherweight: Aaron Pico, the former Olympic-level wrestler and Bellator star, against Losene Keita. Breakdowns closer to the date." },
  "joaquinbuckley|mikemalott": { odds: "Malott -135, Buckley +114 — Buckley opened as a big favorite; the money flipped it",
    note: "Hometown hero vs the more proven name. Malott, on a four-fight streak and fighting in front of a Canadian crowd, wants to box, pressure and look for his guillotine. Buckley has the bigger knockout power and the bigger wins, but he's lost two straight to wrestlers who smothered him, and Malott can do that too. If Buckley lands clean early, the underdog is live; over five rounds, Malott's pace and pressure should tell." },
  "erinblanchfield|jasminejasudavicius": { odds: "Blanchfield -323, Jasudavicius +260",
    note: "A title eliminator in all but name. Blanchfield is the better grappler and wants this on the mat; Jasudavicius is bigger, stronger in the clinch, and has the home crowd. The first takedown attempt tells you a lot: if Jasudavicius can stuff it and keep this standing, she has a real shot at the upset." },
  "cristianperez|kylenelson": { odds: "Perez -305, Nelson +245",
    note: "Debut vs veteran. Perez is the hungry Contender Series finisher with a long reach; Nelson has been around forever and wants a patient kickboxing match he can win on points. Nelson is coming off a knockout loss, and the books expect the new guy to make it two in a row." },
  "kyledaukaus|marcandrebarriault": { odds: "Daukaus -204, Barriault +180",
    note: "Classic brawler vs grappler. Barriault, in front of a Canadian crowd, wants to walk forward and swing heavy. Daukaus wants to tie him up and hunt a choke. Both lost their last fight. If Barriault keeps it standing he has a real shot at the upset; if it hits the mat early, it's Daukaus's night." },
  "louisjourdain|timmycuamba": { odds: "Jourdain -210, Cuamba +165",
    note: "A Quebec prospect's UFC debut at home against a spoiler. Jourdain is on a four-fight win streak and likes to finish with chokes. Cuamba has the longer reach, UFC experience and real power, but he's 2-3 in the promotion. Watch the first takedown: if Jourdain gets it, he's comfortable." },
  "mandelnallo|natelandwehr": { odds: "Nallo -278, Landwehr +230",
    note: "Pure entertainment. Both men lost their last fight, and Landwehr has lost three straight and is moving up to lightweight to turn things around. Nallo is bigger and fighting at home. Neither man backs up, so don't expect this to see the judges." },
  "luishernandez|sedriquesdumas": { odds: "Hernandez -225, Dumas +185",
    note: "The fight the internet made famous: an active-duty Miami-Dade sheriff's deputy, in his UFC debut on short notice, against a fighter whose arrest record has been the story all week. Strip the headlines away and it's a real stylistic clash — Dumas's height and reach against Hernandez's 8-0, all-finishes pressure and back-take game. Dumas is 1-5 in his last six and this looks like his last chance; the market says the deputy wins by stoppage, but that reach is a genuine problem for a 5-foot-9 man moving up to 205." },
  "melissaamaya|valescamachado": { odds: "Machado -230, Amaya +190",
    note: "The Ultimate Fighter 34 women's final, and it's teammate-vs-teammate too (both were Daniel Cormier picks). Machado's experience and Muay Thai against Amaya's perfect record and finishing instinct. Oddsmakers expect a decision — Machado wins rounds, Amaya wins scrambles — so if it hits the mat, the underdog gets interesting. Winner takes the contract." },
  "raonibarcelos|raulrosasjr": { odds: "Rosas -155, Barcelos +130 — the public money is on the veteran",
    note: "Youth-vs-experience in its purest form: 21-year-old Rosas, the youngest signee in UFC history, against a 39-year-old veteran who has already beaten two other men on this card (Jackson and Simon) during his five-fight streak. Both are on five-fight runs; both are grapplers — but Barcelos' boxing is the sharper standup, and Rosas has never done five rounds. First main event for each." },
  "monteljackson|rickysimon": { odds: "Jackson -225, Simon +185",
    note: "Barcelos' last two victims fight each other: Jackson's rare one-punch power and length against Simon's bottomless-gas-tank wrestling. Classic KO-artist-vs-grinder — Simon has to survive the early bombs to drown Jackson late. Winner stays in the top-15 hunt at 135." },
  "bradyhiestand|rinyanakamura": { odds: "Nakamura -380, Hiestand +300",
    note: "A matchup first booked in 2024 that finally happens: Japan's world-class wrestler (and Road to UFC champ) against a TUF 29 finalist coming back from a two-plus-year layoff. Both are 3-1 in the UFC. Nakamura's athletic ceiling is the story; Hiestand's grit and rust are the questions." },
  "ilimbekakylbekuulu|mehemmedeliosmanli": { odds: "Osmanli -285, Akylbek Uulu +230",
    note: "The TUF 34 bantamweight final — and it's teammate-vs-teammate, since both were Michael Bisping picks. Osmanli's flashy submissions (he hit the show's first-ever buggy choke) against Akylbek Uulu's grinding Kyrgyz wrestling. Both are 22. Winner takes the contract." },
  "ailinperez|normadumont": { odds: "Perez -155, Dumont +130",
    note: "The co-main, and the most meaningful fight on the card: #2 vs #4 at women's bantamweight. Dumont's size and clinch boxing against Perez's takedowns and top control. Dumont is trying to restart a streak Joselyne Edwards ended in April; Perez has won six straight and is one win from the title picture." },
  "christianedwards|rodolfobellato": { odds: "Bellato -185, Edwards +154",
    note: "Two light heavyweights who hurt people: Bellato's bulldozing pressure and one-shot power against Edwards' athleticism and wrestling base. Neither man has a reliable off switch, so this very likely doesn't reach the judges. In a division this thin, the winner climbs fast." },
  "vanessademopoulos|yazminjauregui": { odds: "Jauregui -1050, Demopoulos +675 — the biggest favorite on the card",
    note: "Volume vs desperation. Jauregui's non-stop boxing should out-land Demopoulos everywhere on the feet — but Demopoulos is on a three-fight skid, is almost certainly fighting for her job, and only needs one scramble to find an armbar. Jauregui's own two-year layoff is the wildcard." },

  "alexandrepantoja|joshuavan": { title: "Flyweight title", odds: "A true pick'em — Van -107, Pantoja -113",
    note: "The rematch of the strangest title change in years: Pantoja's arm gave out 26 seconds in, and the 26 seconds answered nothing. It's Van's volume striking and takedown defense against Pantoja's scrambles and back-takes. If the rebuilt arm holds and Pantoja drags Van into grappling exchanges, he's live to reclaim the belt; if Van keeps it standing at his pace, the 36-year-old coming off surgery drowns in output." },
  "armantsarukyan|mauricioruffy": { title: "Title eliminator (5 rounds)", odds: "Tsarukyan -380, Ruffy +303",
    note: "Grappler-vs-killer with a shot at champion Gaethje on the line. Tsarukyan should chain-wrestle Ruffy exactly the way Saint Denis did before submitting him — but he has to survive the opening exchanges against a man who just vaporized Fiziev and Chandler, after 10 months on the shelf. Five rounds favor Tsarukyan's engine." },
  "doohochoi|patriciopitbull": { odds: "Lines not posted at write-up time — expect Choi a modest favorite",
    note: "A pure striker's crossroads fight: Choi's fast southpaw counters and body work against Pitbull's compact one-shot counters. Choi has momentum and (relative) youth; Pitbull's low output has already lost him two UFC decisions, so unless he lands the bomb, Choi's volume likely takes it — with a legend's career on the line." },
  "alexandervolkanovski|movsarevloev": { title: "Featherweight title", odds: "Volkanovski -115, Evloev -105 — a true coin flip",
    note: "Old guard vs new: Volkanovski, 37 and one of the best featherweights ever, against Movsar Evloev, who is 20-0 and has never really been in trouble. It's the classic striker-vs-wrestler question — Evloev wants to smother him for 25 minutes, Volkanovski wants to make it a fight. Evloev has waited years for this shot." },
  "merabdvalishvili|petryan": { title: "Bantamweight title", odds: "Yan -170, Dvalishvili +150",
    note: "The rubber match. Yan won the first, Dvalishvili won the second and took the belt, Yan took it back in December. Dvalishvili's pace and takedown volume against Yan's precision boxing — whoever leaves Abu Dhabi with the belt has Song Yadong waiting, who knocked out Umar Nurmagomedov and demanded the next shot." },
  "nataliasilva|wangcong": { title: "Flyweight title (vacant)", odds: "Silva -205, Wang +170",
    note: "For the belt Valentina Shevchenko gave up: she told the UFC she'd be out at least a year, so the title is vacant and these two fight for it. Silva's speed and kicking range against Wang's compact power. Silva has beaten three former champions in a row without ever really being hit; Wang needs to walk her down and land something heavy." },
  "deivesonfigueiredo|paytontalbott": { odds: "Talbott -800, Figueiredo +550 — the books think the legend is done",
    note: "Prospect vs former champ, and the classic question that comes with it: does Figueiredo have one more night left at 38, or is Talbott simply faster and fresher? Figueiredo's power and guillotine are live for as long as the fight lasts; Talbott's movement and volume should win the rounds if it goes long." },
  "gablesteveson|seansharaf": { odds: "Steveson -1500 — one of the heaviest favorites on the card",
    note: "Promoted to open the main card when Ortega pulled out. Steveson is the Olympic gold medalist wrestler the UFC has been bringing along slowly — unbeaten, but against carefully picked opposition, and still raw as a striker. Sharaf is the designated test: if he can stay off his back for a round, the questions about Steveson's stand-up get loud." },
  "alonzomenifield|iwobaraniewski": { odds: "Baraniewski expected to be favored as the unbeaten prospect",
    note: "Prospect-versus-gatekeeper with symmetrical violence: both men hurt people early, so someone likely gets finished inside two rounds. Menifield just proved against Zhang Mingyang that he ends hype trains; Baraniewski's rankings debut depends on weathering the first five minutes." }
});
MATCHUPS["doohochoi|patriciofreire"] = MATCHUPS["doohochoi|patriciopitbull"]; // ESPN name variant
MATCHUPS["ketlensouza|lupitagodinez"] = MATCHUPS["ketlensouza|loopygodinez"]; // "Lupita" is her legal name

/* ============ EVENT META — which fights are the main card ============ */
EVENT_META.push(
  { match: ["ufc 333", "volkanovski vs. evloev", "volkanovski vs evloev"], titles: "2 title fights",
    note: "Abu Dhabi, and the biggest card of the fall: two belts on the line. Volkanovski defends featherweight against an unbeaten wrestler, and the Yan–Dvalishvili trilogy settles a series that's 1-1. Full fighter breakdowns get written closer to the date.",
    mainCard: ["alexandervolkanovski|movsarevloev", "merabdvalishvili|petryan", "loneerkavanagh|ramazantemirov", "alexandervolkov|rizvankuniev", "aaronpico|losenekeita"] },
  { match: ["allen vs. duncan", "allen vs duncan"], titles: "",
    note: "RESULTS: <b>Brendan Allen submitted Christian Leroy Duncan with a rear-naked choke 2:46 into the fifth round</b>, then called out Dricus du Plessis. Jai Herbert out-pointed Matheus Camilo as an underdog, Loopy Godinez beat Ketlen Souza on the cards, Andre Fili knocked out Kai Kamaka III with a head kick, and <b>Otari Tanzilovi upset Malcolm Wellmaker</b> with a head kick and punches. Pre-fight notes below. A five-round middleweight main event between top-five grappler Brendan Allen and rising striker Christian Leroy Duncan, with a top-five spot on the line. Underneath, Loopy Godinez vs Ketlen Souza at strawweight, a must-win for Andre Fili, Malcolm Wellmaker trying to get his knockout touch back, and Matheus Camilo vs Jai Herbert. Main card 8 ET, prelims 5 ET.",
    mainCard: ["brendanallen|christianleroyduncan", "ketlensouza|loopygodinez", "andrefili|kaikamakaiii", "malcolmwellmaker|otaritanzilovi", "jaiherbert|matheuscamilo"] },
  { match: ["buckley vs. malott", "buckley vs malott"], titles: "",
    note: "Saturday in Edmonton: hometown favorite Mike Malott against Joaquin Buckley, who has lost two straight. Buckley opened as a big favorite, but the money poured in on Malott and flipped the line. Erin Blanchfield vs Canada's Jasmine Jasudavicius is the co-main and a likely title eliminator. Two Quebec fighters are on the main card too: Louis Jourdain makes his UFC debut, and Marc-Andre Barriault brawls with Kyle Daukaus.",
    mainCard: ["joaquinbuckley|mikemalott", "erinblanchfield|jasminejasudavicius", "cristianperez|kylenelson", "kyledaukaus|marcandrebarriault", "louisjourdain|timmycuamba", "mandelnallo|natelandwehr"] },
  { match: ["moicano vs. nolan", "moicano vs nolan"], titles: "",
    note: "Halloween at the Meta APEX: veteran lightweight Renato Moicano against Australia's Tom Nolan, who is 11-1 and on a five-fight win streak. A ranked name against a rising one. The rest of the card is still filling in; breakdowns closer to the date.",
    mainCard: ["renatomoicano|tomnolan"] }
);

/* ============ FALLBACK SNAPSHOT (if live feed unreachable) ============ */
(function () {
  const F = (weight, n1, r1, n2, r2) => ({ weight, f1: { name: n1, record: r1, winner: false }, f2: { name: n2, record: r2, winner: false }, done: false, live: false });
  FALLBACK_EVENTS.push(
    { name: "UFC Fight Night: Buckley vs. Malott", date: "2026-10-17T21:00Z", venue: "Rogers Place, Edmonton", fights: [
      F("Welterweight", "Joaquin Buckley", "21-8-0", "Mike Malott", "14-2-1"),
      F("W Flyweight", "Erin Blanchfield", "14-2-0", "Jasmine Jasudavicius", "15-4-0"),
      F("Lightweight", "Kyle Nelson", "17-7-1", "Cristian Perez", "14-2-0"),
      F("Middleweight", "Marc-Andre Barriault", "17-11-0", "Kyle Daukaus", "17-5-0"),
      F("Bantamweight", "Louis Jourdain", "9-3-0", "Timmy Cuamba", "10-4-0"),
      F("Lightweight", "Mandel Nallo", "14-4-0", "Nate Landwehr", "18-8-0"),
      F("Heavyweight", "Tanner Boser", "", "Jhonata Diniz", ""),
      F("Middleweight", "Julien Leblanc", "", "Nick Galanti", ""),
      F("Heavyweight", "Javad Mahjoub", "", "Joel Faglier", ""),
      F("W Flyweight", "Mackenzie Stiller", "", "Katlyn Cerminara", "")
    ]},
    { name: "UFC 333: Volkanovski vs. Evloev", date: "2026-10-24T18:00Z", venue: "Etihad Arena, Abu Dhabi", fights: [
      F("Featherweight", "Alexander Volkanovski", "28-4-0", "Movsar Evloev", "20-0-0"),
      F("Bantamweight", "Petr Yan", "20-5-0", "Merab Dvalishvili", "21-5-0"),
      F("Flyweight", "Lone'er Kavanagh", "", "Ramazan Temirov", ""),
      F("Heavyweight", "Alexander Volkov", "", "Rizvan Kuniev", ""),
      F("Featherweight", "Aaron Pico", "", "Losene Keita", "")
    ]},
    { name: "UFC Fight Night: Moicano vs. Nolan", date: "2026-10-31T21:00Z", venue: "Meta APEX, Las Vegas", fights: [
      F("Lightweight", "Renato Moicano", "21-7-1", "Tom Nolan", "11-1-0")
    ]}
  );
})();
/* ============ BELTS & RANKINGS (snapshot: Sep 13, 2026, post-Noche UFC) ============ */
DIVISIONS.men = [
  { name: "Heavyweight", weight: "265 lb", champ: { name: "Vacant", record: "Undisputed belt", country: "Gane vs Hokit, Nov 14" },
    interim: { name: "Ciryl Gane", record: "14-2", country: "France" },
    beltFacts: "<b>Vacant.</b> Tom Aspinall gave up the belt on Sep 14 — complications from the eye injury he suffered against Gane last October still haven't healed after multiple surgeries. He says he is not retiring and hopes to be back in early 2027. Gane holds the <b>interim</b> belt, but Dana White says that doesn't make him undisputed: he has to win it.",
    top5: [{ rank: "IC", name: "Ciryl Gane", record: "14-2" }, { rank: 2, name: "Alexander Volkov", record: "40-11" }, { rank: 3, name: "Sergei Pavlovich", record: "21-3" }, { rank: 4, name: "Josh Hokit", record: "10-0" }],
    story: "The heavyweight belt is cursed: Jon Jones retired, and now Aspinall has had to vacate without ever defending it. <b>Ciryl Gane fights unbeaten Josh Hokit for the vacant title at UFC 334, Nov 14 at Madison Square Garden</b>, with Gane the clear favorite (around -270). Hokit, a former college wrestler and football player, is 10-0. Below them: Alexander Volkov fights Rizvan Kuniev on the UFC 333 main card (Oct 24), and Curtis Blaydes is climbing back after out-wrestling Waldo Cortes-Acosta in September." },
  { name: "Light Heavyweight", weight: "205 lb", champ: { name: "Carlos Ulberg", record: "15-1", country: "New Zealand" },
    beltFacts: "Won the <b>vacant</b> belt in April 2026 with a first-round KO of Jiří Procházka — but <b>tore his ACL in that fight and is out until 2027</b>. <b>0 defenses.</b>",
    top5: [{ rank: 1, name: "Magomed Ankalaev", record: "20-2-1" }, { rank: 2, name: "Jiří Procházka", record: "32-6-1" }, { rank: 3, name: "Alex Pereira", record: "13-4" }, { rank: 4, name: "Khalil Rountree Jr.", record: "15-7" }, { rank: 5, name: "Navajo Stirling", record: "11-0" }],
    story: "The division is frozen: Ulberg (who says he's targeting an <b>early-2027 return</b>) keeps the belt on ice, and an <b>interim title</b> is in the air — Procházka vs Paulo Costa is reportedly in early negotiations, though Procházka himself has been coy, no card has been named, and nothing is official. Ankalaev still has the strongest claim on paper. New arrival to watch: middleweight escapee Reinier de Ridder <b>blitzed Roman Dolidze in one round</b> in his 205 debut on Aug 22." },
  { name: "Middleweight", weight: "185 lb", champ: { name: "Sean Strickland", record: "31-7", country: "USA" },
    beltFacts: "Won it in May 2026 by <b>split decision over Khamzat Chimaev</b> — one of the year's biggest upsets, and his second reign. <b>0 defenses.</b>",
    top5: [{ rank: 1, name: "Khamzat Chimaev", record: "15-1" }, { rank: 2, name: "Dricus du Plessis", record: "24-3" }, { rank: 3, name: "Nassourdine Imavov", record: "17-4" }, { rank: 4, name: "Brendan Allen", record: "28-7" }, { rank: 5, name: "Caio Borralho", record: "18-2" }],
    story: "Strickland handed the previously-unbeatable Chimaev his first loss. <b>The rematch has cooled off.</b> Strickland's line is that Chimaev has to earn it — “go get a couple W's and I'll see you again” — and Chimaev has taken the hint, now hinting at a fight with #5 Caio Borralho instead. Strickland is eyeing a December return. Meanwhile Gregory 'RoboCop' Rodrigues crashed the contender line by <b>out-striking #6 Anthony Hernandez over five rounds</b> in Sacramento, his fourth straight win." },
  { name: "Welterweight", weight: "170 lb", champ: { name: "Islam Makhachev", record: "29-1", country: "Russia" },
    beltFacts: "Won it in Nov 2025 by dominating Jack Della Maddalena, then <b>beat Ian Machado Garry at UFC 330 (Aug 15) for his first defense — his 17th straight UFC win, breaking Anderson Silva's all-time record</b>.",
    top5: [{ rank: 1, name: "Ian Machado Garry", record: "17-2" }, { rank: 2, name: "Carlos Prates", record: "24-7" }, { rank: 3, name: "Michael Morales", record: "19-0" }, { rank: 4, name: "Jack Della Maddalena", record: "18-4" }, { rank: 5, name: "Gabriel Bonfim", record: "17-1" }],
    story: "Makhachev out-pointed Garry to own the record books outright. Who's next? <b>He named Carlos Prates as 'the most deserving guy'</b> and dismissed unbeaten Michael Morales over inactivity (the two nearly brawled in the crowd at UFC 330). Prates has since signed a new eight-fight contract and says <b>the UFC promised him the title shot next</b>; he's pushing for UFC 334 at Madison Square Garden in November, but nothing is signed. Makhachev has also mused that welterweights 'are stronger and hit harder' — fueling talk of an eventual lightweight return and the dream Topuria superfight." },
  { name: "Lightweight", weight: "155 lb", champ: { name: "Justin Gaethje", record: "28-5", country: "USA" },
    beltFacts: "At 37, won the interim belt in Jan 2026 (beat Paddy Pimblett), then <b>upset Ilia Topuria by TKO at the June White House card</b> to become undisputed champ. <b>0 defenses.</b>",
    top5: [{ rank: 1, name: "Ilia Topuria", record: "17-1" }, { rank: 2, name: "Arman Tsarukyan", record: "24-3" }, { rank: 3, name: "Charles Oliveira", record: "37-11" }, { rank: 4, name: "Max Holloway", record: "28-9" }, { rank: 5, name: "Paddy Pimblett", record: "24-4" }],
    story: "The feel-good story of the year — the ultimate fan-favorite brawler finally won the big one on the White House lawn. Topuria's camp wants an immediate rematch, but <b>Arman Tsarukyan settled the argument at UFC 331: a first-round knockout of Mauricio Ruffy</b> in a five-round eliminator. He is the clear No. 1 contender, and Gaethje vs Tsarukyan is the fight the UFC is expected to book next." },
  { name: "Featherweight", weight: "145 lb", champ: { name: "Alexander Volkanovski", record: "28-4", country: "Australia" },
    beltFacts: "Regained the vacant belt in April 2025, then defended it against Diego Lopes in Sydney in Jan 2026. <b>1 defense</b> this reign.",
    top5: [{ rank: 1, name: "Movsar Evloev", record: "20-0" }, { rank: 2, name: "Diego Lopes", record: "28-8" }, { rank: 3, name: "Lerone Murphy", record: "17-1-1" }, { rank: 4, name: "Aljamain Sterling", record: "26-5" }, { rank: 5, name: "Yair Rodriguez", record: "21-5" }],
    story: "It's official: <b>Volkanovski defends against unbeaten Russian wrestler Movsar Evloev in the main event of UFC 333 — Oct 24 in Abu Dhabi</b>. Classic striker-vs-grappler, old guard vs new: the 37-year-old legend against a 20-0 smothering wrestler getting his first title shot." },
  { name: "Bantamweight", weight: "135 lb", champ: { name: "Petr Yan", record: "20-5", country: "Russia" },
    beltFacts: "Regained the belt in Dec 2025 with a decision over Merab Dvalishvili, avenging his 2023 loss. <b>0 defenses</b> this reign.",
    top5: [{ rank: 1, name: "Merab Dvalishvili", record: "21-5" }, { rank: 2, name: "Sean O'Malley", record: "20-3" }, { rank: 3, name: "Song Yadong", record: "24-9-1" }, { rank: 4, name: "Umar Nurmagomedov", record: "20-2" }, { rank: 5, name: "Mario Bautista", record: "18-3" }],
    story: "The division flipped overnight: <b>Song Yadong knocked Umar Nurmagomedov out cold in Shanghai (Aug 29)</b> — a second-round uppercut as Umar shot for a takedown — and immediately demanded a title shot. Meanwhile <b>Yan vs Merab III co-headlines UFC 333 (Oct 24, Abu Dhabi)</b>; they're 1-1, winner settles it, and Song now has the loudest claim on whoever leaves Abu Dhabi with the belt. Youth watch: Raul Rosas Jr. gets his first main event Sep 26." },
  { name: "Flyweight", weight: "125 lb", champ: { name: "Joshua Van", record: "18-2", country: "Myanmar/USA" },
    beltFacts: "Won the belt in Dec 2025 — a 26-second TKO when Pantoja's arm gave out — defended with a round-5 TKO of Tatsuro Taira in May, then <b>settled it for real at UFC 331 on Sep 19: a clean five-round decision over Pantoja</b>. 2 defenses.",
    top5: [{ rank: 1, name: "Manel Kape", record: "23-7" }, { rank: 2, name: "Alexandre Pantoja", record: "30-7" }, { rank: 3, name: "Brandon Royval", record: "18-9" }, { rank: 4, name: "Tatsuro Taira", record: "18-2" }, { rank: 5, name: "Kyoji Horiguchi", record: "34-5" }],
    story: "At 24, Van is <b>the youngest champion on the roster</b> and, after out-striking Pantoja for 25 minutes, a top-five pound-for-pound fighter on most media lists. Pantoja slid to #2 behind <b>Manel Kape, the obvious next challenger</b>. A Van–Kape fight would be the first real test of whether anyone at 125 can slow him down." }
];
P4P.explain = "<b>Pound-for-pound</b> is a fun, hypothetical ranking: who's the best fighter if weight didn't matter? It compares champions and stars across divisions by skill and résumé. No belt attached — pure bragging rights.";
P4P.men = [{ name: "Islam Makhachev", record: "29-1" }, { name: "Alexander Volkanovski", record: "28-4" }, { name: "Petr Yan", record: "20-5" }, { name: "Joshua Van", record: "18-2" }, { name: "Justin Gaethje", record: "28-5" }, { name: "Ilia Topuria", record: "17-1" }, { name: "Tom Aspinall", record: "15-3" }, { name: "Sean Strickland", record: "31-7" }, { name: "Merab Dvalishvili", record: "21-5" }, { name: "Arman Tsarukyan", record: "24-3" }];

/* ============ STORYLINES & UFC 101 ============ */
STORYLINES.push(
  { em: "💥", title: "UFC 332: a record night of knockouts", body: [
    "Salt Lake City set a UFC record with <b>11 knockouts on one card</b>, nine in the first round. The breakout star: <b>Payton Talbott dropped former two-division champ Deiveson Figueiredo 30 seconds in and finished him at 2:09</b>, his second straight win over a former champion, then called out Sean O'Malley. Natalia Silva won the vacant women's flyweight belt by decision in the main event.",
    "The upset came from the oldest-looking script in MMA: <b>Roman Kopylov, a +210 underdog, knocked out hyped prospect Ateba Gautier</b> with a straight left in round one. Esteban Ribovics dropped King Green three times for a stoppage, and Roberto Soldic got knocked down twice in his UFC debut before battering Khaos Williams for a decision. On the prelims, Johnny Walker knocked out Mick Parkin with a knee in his heavyweight debut, and Marvin Vettori lost his fifth straight."] },
  { em: "🔒", title: "Vegas 122: Allen finds the choke late", body: [
    "<b>Brendan Allen submitted Christian Leroy Duncan in the fifth round</b> — the striker had won the fourth and was gaining momentum before Allen took his back and finished it at 2:46. That's four straight wins for Allen, and he immediately called out former champion Dricus du Plessis, accusing him of ducking the fight.",
    "Underneath: veteran Jai Herbert out-pointed Matheus Camilo as an underdog, Andre Fili kept his job with a head-kick knockout of Kai Kamaka III, and Georgia's Otari Tanzilovi knocked out Malcolm Wellmaker in the upset of the night."] },
  { em: "🐐", title: "Makhachev owns the record books", body: [
    "At UFC 330 Islam Makhachev out-pointed Ian Machado Garry for his first welterweight defense and his <b>17th straight UFC win — breaking Anderson Silva's all-time record</b> (16) that stood for 14 years. He named <b>Carlos Prates</b> as the most deserving next challenger, waved off unbeaten Michael Morales, and hinted he misses lightweight — where a Topuria superfight still lurks."] },
  { em: "🗓️", title: "UFC 333 is loaded (Oct 24, Abu Dhabi)", body: [
    "Two title fights, both announced this month: <b>Volkanovski vs unbeaten Movsar Evloev</b> for the featherweight belt, and the <b>Petr Yan vs Merab Dvalishvili trilogy</b> (1-1 apiece) for the bantamweight belt. The fall's biggest card by a mile."] },
  { em: "👑", title: "Heavyweight still needs one king", body: [
    "<b>Tom Aspinall vacated the heavyweight title on Sep 14</b>. The eye injury from his October 2025 fight with Ciryl Gane (an accidental eye poke, ruled a no-contest) never fully healed, despite multiple surgeries. He says he isn't retiring and hopes to return in early 2027.",
    "Gane holds the interim belt, but Dana White ruled he still has to win the real one. So <b>Gane vs Josh Hokit for the vacant title headlines UFC 334 on Nov 14 at Madison Square Garden</b>, with Kayla Harrison vs Amanda Nunes as the co-main."] },
  { em: "🧊", title: "Light heavyweight is frozen", body: [
    "Champion Carlos Ulberg <b>tore his ACL winning the belt</b> and now says he's targeting an early-2027 return. An interim title while he heals is reportedly in early negotiations — Jiří Procházka vs Paulo Costa, possibly at UFC 332 — though Procházka himself is coy and #1 contender Ankalaev is stuck waiting either way."] },
  { em: "🌋", title: "Legends: one out, two in limbo", body: [
    "<b>Edson Barboza retired</b> at UFC 330, leaving his gloves in the cage after 16 years. <b>Conor McGregor</b> was knocked out by Max Holloway in 69 seconds in July (his knee buckled — surgery, then he vows one final fight on his contract). <b>Jon Jones</b> re-retired in April after the White House snub, un-retired a day later, and still has nothing booked."] }
);
EXPLAINERS.push(
  { em: "🏆", title: "Undisputed vs interim vs vacant", body: [
    "<b>Undisputed champ</b> = the real champion. <b>Interim champ</b> = a temporary champ crowned when the real one is injured or inactive — the two eventually fight to \"unify.\" <b>Vacant</b> = nobody holds it (champ left, retired, or was stripped), so two top contenders fight for the empty belt."] },
  { em: "📺", title: "Where to watch (US)", body: [
    "The UFC's 7-year, <b>$7.7 billion deal with Paramount</b> kicked in for 2026. Every event streams on <b>Paramount+</b>, big numbered cards are simulcast on CBS, and the old $80 pay-per-view charge is gone. One subscription covers everything."] },
  { em: "🥊", title: "How a fight card works", body: [
    "Events run in three blocks: <b>early prelims → prelims → main card</b> (usually 5–6 fights, best for last). The <b>main event</b> is 5 rounds; everything else is 3, unless it's a title fight. A <b>Fight Night</b> is a smaller weekly-style card; <b>numbered events</b> (UFC 331, 332…) are the big monthly shows with title fights.", "This app filters out the spin-off shows (Contender Series, TUF) automatically."] },
  { em: "🔢", title: "How rankings and title shots work", body: [
    "Each division ranks its top 15 contenders. There's <b>no strict queue</b> — the champ usually fights #1 or #2, but big names and fan-demand fights can jump the line. \"Title eliminator\" = a fight where the winner is promised (informally) the next shot."] },
  { em: "⚖️", title: "Weight classes in 10 seconds", body: [
    "Flyweight 125 → Bantamweight 135 → Featherweight 145 → Lightweight 155 → Welterweight 170 → Middleweight 185 → Light Heavyweight 205 → Heavyweight 265. Fighters weigh in the day before, then rehydrate — most are 10–20 lbs heavier on fight night."] },
  { em: "🃏", title: "Reading a record: 29-1-0", body: [
    "Wins–Losses–Draws. You'll also see <b>NC</b> (no contest — the fight was thrown out, e.g. an accidental foul). Finishes come three ways: <b>KO/TKO</b> (strikes), <b>submission</b> (tap out), or <b>decision</b> (judges' scorecards after all rounds)."] },
  { em: "💰", title: "Reading betting odds", body: [
    "<b>-350</b> means bet $350 to win $100 (the favorite). <b>+275</b> means a $100 bet wins $275 (the underdog). Bigger minus = heavier favorite. Odds here are from the breakdown write-up date and move constantly — treat them as \"who's expected to win and by how much,\" not gospel."] }
);

/* ============ ESPN ATHLETE IDS (for headshots) ============ */
(function () {
  const RAW = {
    "Umar Nurmagomedov": "4569549", "Song Yadong": "3151289", "Yan Xiaonan": "4275487", "Denise Gomes": "4963343",
    "Aoriqileng": "4389085", "Kai Asakura": "4336757", "Alex Perez": "3155425", "Sumudaerji": "4405109",
    "Junior Tafa": "5122234", "Ce Liu": "5292011", "Liu Ce": "5292011", "Namsrai Batbayar": "5145018", "Andre Lima": "5157669",
    "Jack Jenkins": "5088885", "Sean Woodson": "4566991", "Rei Tsuruya": "5137012", "Kevin Borjas": "5144066",
    "Jingnan Xiong": "3956295", "Xiong Jingnan": "3956295", "Julia Polastri": "4686723",
    "Dan Hooker": "3109135", "Salahdine Parnasse": "4312859", "Farès Ziam": "4083018", "Axel Sola": "5245078",
    "Michael Page": "3022067", "Nursulton Ruziboev": "4422103", "Morgan Charrière": "4324622", "Felipe Lima": "5101694",
    "Losene Keita": "5192314", "Muhammad Naimov": "4690540", "Mario Pinto": "5218817", "Ryan Spann": "3887606",
    "Oumar Sy": "5074120", "Modestas Bukauskas": "4279621", "Nathaniel Wood": "3950354", "Mairon Santos": "4914573",
    "Kurtis Campbell": "5310075", "Trevor Peek": "5048900", "Nora Cornolle": "4916974", "Klaudia Syguła": "5122175",
    "Matthieu Letho Duclos": "5013686", "Luis Felipe Dias": "4693161",
    "Jean Silva": "5145766", "Jose Miguel Delgado": "5223435", "Brandon Moreno": "3027545", "Joseph Morales": "4238229",
    "Tommy McMillen": "5212849", "Marwan Rahiki": "5302274", "Manon Fiorot": "4608674", "Alexa Grasso": "3136287",
    "Waldo Cortes-Acosta": "4903365", "Curtis Blaydes": "3922557", "David Martinez": "4503229", "Dan Ige": "4074001",
    "Tim Elliott": "2614020", "Edgar Chairez": "5076027", "Ignacio Bahamondes": "4038116", "Muslim Salikhov": "3132513",
    "Kelvin Gastelum": "3026011", "Yousri Belgaroui": "5149815", "Ramiro Jimenez": "5290796", "Rodrigo Vera": "4422430",
    "JJ Aldrich": "3136289", "Regina Tarin": "5338118", "Rafa Garcia": "4690549", "Rongzhu": "4773371",
    "Alexandre Pantoja": "2560746", "Arman Tsarukyan": "4419372", "Mauricio Ruffy": "5122238",
    "Patricio Pitbull": "2532870", "Patricio Freire": "2532870", "Dooho Choi": "3093026", "Renato Moicano": "3028863",
    "Brian Ortega": "3045737", "Alonzo Menifield": "3948876", "Iwo Baraniewski": "5307810",
    "Gable Steveson": "5214652", "Sean Sharaf": "5240957", "Marlon Vera": "3155424", "Charles Jourdain": "4421978",
    "Tai Tuivasa": "3722422", "Robelis Despaigne": "5189560", "Edmen Shahbazyan": "4354318", "Brunno Ferreira": "5077131",
    "Giga Chikadze": "3957071", "Joanderson Brito": "4422355", "Casey O'Neill": "4699589", "Eduarda Moura": "5143888",
    "Ryan Gandra": "5291085", "Ozzy Diaz": "4944080", "Michael Aswell": "5212738", "JooSang Yoo": "5282139",
    "Raul Rosas Jr.": "5088844", "Raoni Barcelos": "3075570", "Montel Jackson": "4339130", "Ricky Simon": "3922491",
    "Rinya Nakamura": "5068624", "Brady Hiestand": "4815974", "Mehemmedeli Osmanli": "5345640", "Ilimbek Akylbek Uulu": "5345639",
    "John Castaneda": "4063869", "Alatengheili": "3154389", "Rodolfo Vieira": "4426250", "Robert Bryczek": "4341572",
    "Josiah Harrell": "5149546", "Elves Brener": "5110006", "Rodolfo Bellato": "5060489", "Christian Edwards": "4799517",
    "Norma Dumont": "4418784", "Ailin Perez": "5075333", "Vanessa Demopoulos": "4683395", "Yazmin Jauregui": "5063403",
    "Melissa Amaya": "5169699", "Valesca Machado": "4836549", "Sedriques Dumas": "5060467", "Luis Hernandez": "5369427",
    "King Green": "2502364", "Esteban Ribovics": "5074131", "Roberto Soldic": "4274796", "Khaos Williams": "4612580", "Roman Kopylov": "4300149", "Ateba Gautier": "5218421", "Brendan Allen": "4025699", "Christian Leroy Duncan": "4848674",
    "Loopy Godinez": "4700617", "Lupita Godinez": "4700617", "Ketlen Souza": "4566308", "Andre Fili": "3074464", "Kai Kamaka III": "4688447", "Malcolm Wellmaker": "5212854", "Otari Tanzilovi": "5212853", "Matheus Camilo": "5170144", "Jai Herbert": "4078246",
    "Joaquin Buckley": "4024714",
    // Belts & Ranks names (Oct 11), from each fighter's espn.com/mma/fighter/_/id profile URL
    "Dricus du Plessis": "3166126", "Nassourdine Imavov": "4690539", "Caio Borralho": "4835137", "Magomed Ankalaev": "4273399", "Jiří Procházka": "3156612", "Khalil Rountree Jr.": "4028627", "Navajo Stirling": "5216713", "Alexander Volkov": "2993650", "Sergei Pavlovich": "4217395", "Josh Hokit": "4049391", "Jack Della Maddalena": "4828707", "Carlos Prates": "4294832", "Gabriel Bonfim": "4921516", "Michael Morales": "4869426", "Charles Oliveira": "2504169", "Max Holloway": "2614933", "Paddy Pimblett": "4008549", "Movsar Evloev": "4029275", "Diego Lopes": "4881999", "Lerone Murphy": "4576101", "Yair Rodriguez": "3155420", "Sean O'Malley": "4205093", "Mario Bautista": "4410868", "Aljamain Sterling": "3031559", "Manel Kape": "4236504", "Brandon Royval": "4239928", "Tatsuro Taira": "4917772", "Kyoji Horiguchi": "2613374", "Payton Talbott": "5144008", "Deiveson Figueiredo": "4189320", "Natalia Silva": "4054605", "Wang Cong": "4215200", "Mike Malott": "3165120", "Erin Blanchfield": "4350796", "Jasmine Jasudavicius": "4835135",
    "Islam Makhachev": "3332412", "Ian Machado Garry": "4738092",
    "Tom Aspinall": "4010976", "Ciryl Gane": "4426000", "Carlos Ulberg": "4695736", "Sean Strickland": "3093653",
    "Justin Gaethje": "3022345", "Alexander Volkanovski": "3949584", "Petr Yan": "4293517", "Joshua Van": "5120301",
    "Ilia Topuria": "4350812", "Merab Dvalishvili": "3948572", "Alex Pereira": "4705658", "Khamzat Chimaev": "4684751"
  };
  Object.keys(RAW).forEach(n => { ESPN_IDS[norm(n)] = RAW[n]; });
})();
