/* =====================================================================
   Fight Companion — baked data. THE REFRESH EDITS ONLY THIS FILE.
   Shapes are documented in CLAUDE.md ("Baked data blocks"). The containers
   (FIGHTERS, MATCHUPS, ...) and helpers like norm() are declared in app.js,
   which loads first; the page boots after this file runs.
   ===================================================================== */
const ANALYSIS_STAMP = "November 5, 2026";

/* ============ FIGHTER PROFILES — main-card fighters on current cards, plus ranked fighters ============ */
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
  renatomoicano: { name: "Renato Moicano", ht: 71, reach: 72, nick: "Money", age: 37, country: "Brazil", style: "Rangy jab-heavy kickboxer with elite ground grappling", strengths: [
    "Rebounded from his skid with a submission of Chris Duncan in an April main event",
    "Big-fight experience — stepped up on one day's notice to fight Makhachev for the title",
    "Great jab and strong submission defense"],
    weaknesses: ["Has struggled against elite pressure and big finishers", "37, against a 26-year-old on a five-fight run"],
    history: "A longtime contender from Brazil, as famous for his mic work ('I love money!') as his jab. He submitted Chris Duncan in an April main event; a September rematch with Brian Ortega fell through when Ortega withdrew. Now he headlines Halloween against a rising Australian." },
  brendanallen: { name: "Brendan Allen", ht: 74, reach: 75, nick: "All In", age: 30, country: "USA", style: "Submission grappler — chains takedowns until one lands, then hunts the back", strengths: [
      "Finishing on the mat: most of his wins are submissions, usually the rear-naked choke",
      "Relentless takedown chains — he keeps shooting until he gets the fight where he wants it",
      "On a three-fight run over Marvin Vettori, Reinier de Ridder and Edmen Shahbazyan, two of them Fight of the Night"],
    weaknesses: [
      "Giving up four inches of reach to a better kickboxer — the first round on the feet is dangerous for him",
      "Can get dragged into brawls he doesn't need, which is how both Fight of the Night bonuses happened",
      "Has been finished by strikes before when he stayed in the pocket too long"],
    history: "A former LFA middleweight champion who has been in the UFC since 2019 and is now <b>ranked in the top five</b>. Quietly one of the most active contenders in the division, and he has beaten everyone the UFC has put in front of him lately. A win over a rising striker would put him one or two fights from a title shot." },
  alexandervolkanovski: { name: "Alexander Volkanovski", ht: 66, reach: 71.5, nick: "The Great", age: 38, country: "Australia", style: "Complete fighter — smart pressure, fast hands, and wrestling defense", strengths: [
      "One of the best featherweights ever: two title reigns and a long list of defenses",
      "Fight IQ — he adjusts mid-fight better than almost anyone",
      "Beat Diego Lopes twice in the last 18 months, the second time in January"],
    weaknesses: ["38 years old — the oldest he's ever been for a title fight", "Has been knocked out before (Topuria, Makhachev)"],
    history: "The former rugby player from Australia who ruled featherweight from 2019 to 2024, lost the belt to Ilia Topuria, then won it back by beating Diego Lopes in April 2025. He defended it against Lopes again in Sydney in January. A win here would tie José Aldo's record for featherweight title defenses." },
  movsarevloev: { name: "Movsar Evloev", ht: 67, reach: 72.5, nick: "", age: 32, country: "Russia", style: "Suffocating wrestler — takedowns, top control, and steady pressure", strengths: [
      "Unbeaten: 20-0 as a pro, and nobody has really solved him",
      "Elite wrestling and top control — he can win every round on the mat",
      "Beat Lerone Murphy in March to lock up this title shot"],
    weaknesses: ["Rarely finishes — he wins on the scorecards, which leaves room for mistakes", "Faces the best striker he has ever met"],
    history: "From Ingushetia in southern Russia, and the most patient climber in the division. He has quietly gone 20-0, beating everyone the UFC put in front of him, often by close decisions. He finally gets his shot after years of waiting." },
  petryan: { name: "Petr Yan", ht: 67, reach: 67, nick: "No Mercy", age: 33, country: "Russia", style: "Precision boxer — switches stances, sits down on punches, strong takedown defense", strengths: [
      "Some of the best boxing at 135 pounds",
      "Solved Dvalishvili's wrestling in December to take the belt back",
      "Two-time champion with tons of big-fight experience"],
    weaknesses: ["Lost the first fight to Dvalishvili in 2023, swamped by takedowns", "Tends to start slow and give away early rounds"],
    history: "A Russian two-time bantamweight champion. He lost a lopsided decision to Merab Dvalishvili in 2023, rebuilt, then beat him clearly in December 2025 to win the belt back and snap Dvalishvili's 14-fight winning streak. Now he has to do it again." },
  merabdvalishvili: { name: "Merab Dvalishvili", ht: 66, reach: 68, nick: "The Machine", age: 35, country: "Georgia", style: "Non-stop pressure wrestler — endless takedown attempts and cardio", strengths: [
      "Legendary cardio: he never slows down over five rounds",
      "Holds the UFC record for takedown attempts in a fight — against Yan, in 2023",
      "Won 14 straight before December, including a dominant title reign"],
    weaknesses: ["Yan's takedown defense held up in December", "Not a big knockout threat — he wins by grinding"],
    history: "From the country of Georgia, and one of the most dominant champions of recent years — a 14-fight win streak and a long run with the belt before Yan took it in December. He says he'll show Yan new tools this time. This trilogy decides who owns the rivalry." },
  loneerkavanagh: { name: "Lone'er Kavanagh", reach: 67, nick: "", age: 27, country: "England", style: "Fast, sharp striker with good wrestling to go with it", strengths: [
      "Young, fast and technical on the feet",
      "Was ranked in the flyweight top 10 before his last fight",
      "Trains with Great Britain Top Team, one of the best gyms in the UK"],
    weaknesses: ["Coming off his first UFC loss — submitted by Brandon Royval in July", "Gives up power to Temirov"],
    history: "A London-born flyweight with a 10-2 record who came up fast, getting a ranked fight against a former title challenger. Brandon Royval caught him with a submission in July. A win here gets him right back into the top-10 mix." },
  ramazantemirov: { name: "Ramazan Temirov", ht: 64, reach: 63, nick: "", age: 29, country: "Uzbekistan", style: "Explosive power puncher — finishes fights early", strengths: [
      "Huge power for 125 pounds: 11 knockout wins",
      "Fast starter — 10 of his wins came in the first round",
      "Only three losses in over 20 pro fights"],
    weaknesses: ["Short reach (63 inches), so he has to get close", "Less proven over three full rounds"],
    history: "From Karshi, Uzbekistan, a fast-rising flyweight who has been knocking people out since his UFC debut in 2024. He's one of the hardest hitters in the division. The books see this as an even fight." },
  alexandervolkov: { name: "Alexander Volkov", ht: 79, reach: 80, nick: "Drago", age: 37, country: "Russia", style: "Tall, technical kickboxer — keeps opponents on the end of long strikes", strengths: [
      "Huge size: 6-foot-7 with an 80-inch reach",
      "Experience: 51 pro fights and a top-five heavyweight for years",
      "Beat Waldo Cortes Acosta by decision in May"],
    weaknesses: ["Can be taken down and held by strong wrestlers", "37, facing a younger, rising contender"],
    history: "A Russian veteran with a 40-11 record and one of the most consistent heavyweights of the last decade. He's never won the belt but always seems to be near the top. Beat Waldo Cortes Acosta in May and is the favorite here." },
  rizvankuniev: { name: "Rizvan Kuniev", ht: 76, reach: 76, nick: "", age: 34, country: "Russia", style: "Dagestani wrestler with heavy ground-and-pound", strengths: [
      "Strong wrestling — he can drag big men to the mat",
      "Coming off a TKO win over Tyrell Fortune in July",
      "Ranked in the heavyweight top 10"],
    weaknesses: ["Gives up three inches of height and four of reach", "Less proven against the division's elite"],
    history: "A Dagestani heavyweight who joined the UFC in 2025 and has climbed into the rankings. He stopped Tyrell Fortune in July. Against Volkov, he needs to close the distance and wrestle — standing at range is Volkov's world." },
  aaronpico: { name: "Aaron Pico", ht: 68, reach: 70.5, nick: "", age: 30, country: "USA", style: "Elite wrestler with big knockout power", strengths: [
      "World-class wrestling background — he was an Olympic-level prospect",
      "Real power: 9 knockout wins",
      "Beat Patricio Pitbull, a former Bellator champion, in April"],
    weaknesses: ["Knocked out by Lerone Murphy in his UFC debut", "Late opponent change — he prepared for Arnold Allen"],
    history: "Once the most-hyped prospect in MMA, a wrestling star who turned pro young and became a Bellator star. His UFC debut in 2025 went badly, a knockout loss to Lerone Murphy. He bounced back by out-pointing Patricio Pitbull in April." },
  losenekeita: { name: "Losene Keita", reach: 72, nick: "Black Panther", age: 28, country: "Belgium", style: "Rangy striker with finishing power", strengths: [
      "Coming off a first-round knockout of Muhammad Naimov in Paris",
      "Long 72-inch reach",
      "Only two losses in 19 pro fights"],
    weaknesses: ["Took this fight on short notice", "Lost a split decision to Nathaniel Wood in March"],
    history: "A Belgian featherweight with a 17-2 record. He knocked out Muhammad Naimov in the first round at UFC Paris on September 5. When Arnold Allen pulled out injured, he grabbed this short-notice chance — and the books actually make him the slight favorite." },
  tomnolan: { name: "Tom Nolan", reach: 73, nick: "Big Train", age: 26, country: "Australia", style: "Tall, aggressive striker — long punches and a fast finishing instinct", strengths: [
      "On a five-fight win streak, most recently a decision over Fares Ziam in June",
      "Very tall for a lightweight, with a 73-inch reach",
      "Finisher: five of his wins came in the first round"],
    weaknesses: ["Biggest step up of his career — first main event, first ranked veteran of this level", "Has never gone five rounds"],
    history: "From Brisbane, Queensland. He earned his UFC contract on the Contender Series in 2023 with a first-round TKO and has kept winning since: 11-1, with five straight. Now the UFC is testing him against a veteran who's fought for the title." },
  gabrielbonfim: { name: "Gabriel Bonfim", ht: 73, reach: 72, nick: "Marretinha", age: 29, country: "Brazil", style: "Explosive all-rounder — dangerous submissions and heavy hands", strengths: [
      "20-1, and just beat former champion Belal Muhammad over five rounds in June",
      "Submission threat from every position",
      "Young and still improving — now ranked in the top five"],
    weaknesses: ["His only loss was a knockout (to Nicolas Dalby in 2023)", "Faces one of the best grapplers in the division"],
    history: "A Brazilian welterweight with a 20-1 record. His only loss came against Nicolas Dalby in 2023. He announced himself as a contender by beating ex-champ Belal Muhammad 50-45 on all three cards in June. A win over Brady would put him in the title picture." },
  cirylgane: { name: "Ciryl Gane", ht: 76, reach: 81, nick: "Bon Gamin", age: 36, country: "France", style: "Light-footed kickboxer — moves like a middleweight, picks big men apart", strengths: [
      "Best footwork and striking variety in the division",
      "Huge 81-inch reach that he uses to keep fights at range",
      "Stopped Alex Pereira in round two in June to win the interim belt"],
    weaknesses: ["Has lost to elite wrestlers before (Francis Ngannou took him down repeatedly)", "Has never successfully defended an undisputed title"],
    history: "A former Muay Thai fighter from France who rose to the top of heavyweight fast. He lost title fights to Ngannou and Jon Jones, then his 2025 title fight with Tom Aspinall ended in a no contest after an accidental eye poke. He beat Pereira at the White House in June, and when Aspinall vacated, the UFC made him the undisputed champion." },
  joshhokit: { name: "Josh Hokit", ht: 73, reach: 73, nick: "", age: 28, country: "USA", style: "Powerful wrestler with heavy hands — finishes almost everyone", strengths: [
      "Unbeaten: 10-0, with nine finishes",
      "All-American wrestler at Fresno State — he can take big men down",
      "Went 4-0 in his first year in the UFC, including a knockout of Derrick Lewis"],
    weaknesses: ["Gives up three inches of height and eight of reach", "Has never faced a striker anywhere near Gane's level"],
    history: "From Fresno, California: a state-champion high school wrestler who became an All-American at Fresno State. He has run through the UFC since arriving, 4-0 in under a year, including a stoppage of Derrick Lewis at the White House event. He called for this shot the day the belt came open." },
  kaylaharrison: { name: "Kayla Harrison", ht: 68, reach: 66, nick: "", age: 36, country: "USA", style: "Olympic judo champion — throws, top control and crushing submissions", strengths: [
      "Two-time Olympic gold medalist in judo",
      "19-1, and nobody has been able to stop her takedowns and throws",
      "Submitted Julianna Peña with a kimura to win the belt in June 2025"],
    weaknesses: ["Coming back from neck surgery — her first fight in 17 months", "Less dangerous if the fight stays standing at range"],
    history: "An American judo legend who became a dominant MMA fighter, first in the PFL and then the UFC. She won the bantamweight belt in June 2025. Her first defense, against Nunes in January, was postponed when she needed surgery for herniated discs in her neck. Now it's finally happening." },
  amandanunes: { name: "Amanda Nunes", ht: 68, reach: 69, nick: "The Lioness", age: 38, country: "Brazil", style: "Power striker with black-belt jiu-jitsu — the most complete woman ever to fight", strengths: [
      "Widely seen as the greatest women's fighter of all time — beat Cyborg, Rousey and Shevchenko twice",
      "13 knockout wins: real one-punch power",
      "Former two-division champion who has been in every kind of big fight"],
    weaknesses: ["Hasn't fought since June 2023 — three years of ring rust", "Turning 39 next spring, against a younger, bigger grappler"],
    history: "From Bahia, Brazil. She held two UFC belts at once and beat nearly every big name in women's MMA before retiring in 2023 with a win over Irene Aldana. She has said retirement didn't suit her, and she came back for one reason: to take Harrison's belt." },
  caioborralho: { name: "Caio Borralho", reach: 75, nick: "The Natural", age: 33, country: "Brazil", style: "Patient, well-rounded counter-fighter — smart striking, strong grappling", strengths: [
      "Ranked in the middleweight top five, with only two losses in 21 fights",
      "Beat Reinier de Ridder by decision in March",
      "Rarely makes mistakes — hard to beat cleanly"],
    weaknesses: ["Gives up four inches of reach to a much bigger man", "Methodical style can let a striker set the pace"],
    history: "A Brazilian middleweight with an 18-2 record (plus one no contest) who climbed into the title picture by beating good fighters steadily rather than flashily. His March win over Reinier de Ridder kept him near the top. A win at the Garden keeps him in line for a title shot." },
  yousribelgaroui: { name: "Yousri Belgaroui", ht: 78, reach: 79, nick: "", age: 34, country: "Tunisia", style: "Towering kickboxer — long kicks, knees and straight punches", strengths: [
      "Elite kickboxing pedigree: three-time Glory middleweight title challenger",
      "Enormous for middleweight: 6-foot-6 with a 79-inch reach",
      "Dangerous at range, where most middleweights can't touch him"],
    weaknesses: ["Newer to MMA wrestling and grappling", "Faces the best all-rounder of his career"],
    history: "A Tunisian kickboxer who fought for the Glory middleweight title three times before switching to MMA and joining the UFC. His size and kickboxing make him a nightmare at range. Borralho is the toughest test he's faced, and a big step up in the rankings." },
  kevinholland: { name: "Kevin Holland", ht: 75, reach: 81, nick: "Trailblazer", age: 33, country: "USA", style: "Creative, unorthodox striker with a long reach and a big personality", strengths: [
      "Huge 81-inch reach and a real knack for finishing",
      "Experience: 44 pro fights against all kinds of opponents",
      "Beat Randy Brown by unanimous decision in April"],
    weaknesses: ["Has been up and down in recent years", "Can be out-wrestled and out-worked by grinders"],
    history: "One of the UFC's most entertaining fighters, with a 29-15 record split between welterweight and middleweight. He's famous for his trash talk and wild finishes. He beat Randy Brown in April and now faces a ranked, dangerous striker." },
  urosmedic: { name: "Uros Medic", ht: 73, reach: 71, nick: "The Doctor", age: 33, country: "USA", style: "Southpaw power striker who looks for the knockout", strengths: [
      "Heavy left hand and plenty of knockout wins",
      "Ranked in the welterweight top 15",
      "Beat veteran Muslim Salikhov last November"],
    weaknesses: ["Gives up ten inches of reach to Holland", "Facing a far more experienced opponent"],
    history: "A ranked welterweight with a reputation as a knockout artist and a dangerous southpaw left. Beating a big name like Holland at the Garden would be his best win yet." },
  bilalhasan: { name: "Bilal Hasan", ht: 67, reach: 70, nick: "The IndoNinja", age: 25, country: "Indonesia", style: "Explosive young finisher — knockouts from anywhere", strengths: [
      "Unbeaten: 10-0, with eight knockouts",
      "Won his contract with a 45-second TKO on the Contender Series in August",
      "Long 70-inch reach for a flyweight"],
    weaknesses: ["UFC debut — and at Madison Square Garden", "Hasn't been tested by anyone this experienced"],
    history: "A 25-year-old flyweight with Indonesian roots who has finished nearly everyone he's fought. He earned his UFC contract on the Contender Series in August with a 45-second TKO. The UFC put him straight onto a stacked Garden main card." },
  luisgurule: { name: "Luis Gurule", ht: 65, reach: 64, nick: "Grim", age: 32, country: "USA", style: "Busy, tough flyweight who wins scrappy fights", strengths: [
      "Experience: about 15 pro fights and several UFC appearances",
      "Beat Daniel Barez by decision in May",
      "Tough and durable"],
    weaknesses: ["Lost to Rei Tsuruya by first-round submission in May", "Gives up six inches of reach to Hasan"],
    history: "A US flyweight with a record around 11-4 who has been in and out of the UFC win column. He beat Daniel Barez in May, then got submitted by Rei Tsuruya two weeks later. Here he's the veteran test for a hyped debutant." },
  jacobesmith: { name: "Jacobe Smith", ht: 70, reach: 72, nick: "Cobe", age: 30, country: "USA", style: "Unbeaten pressure fighter with heavy hands", strengths: [
      "Perfect 13-0 record",
      "Knocked out Bruce Whitehead at UFC 332 on Oct 3",
      "Confident enough to take a co-main on 12 days' notice"],
    weaknesses: ["Short notice — second fight in four weeks", "Gives up five inches of height and six of reach"],
    history: "An unbeaten welterweight prospect who knocked out Bruce Whitehead at UFC 332 earlier this month, then jumped at this co-main slot when Carlos Leal got hurt. A win over a veteran like Brown would push him toward the rankings." },
  randybrown: { name: "Randy Brown", ht: 75, reach: 78, nick: "Rude Boy", age: 36, country: "", style: "Long, rangy striker — keeps opponents on the end of punches and kicks", strengths: [
      "Huge length for welterweight: 6-foot-3 with a 78-inch reach",
      "Experience: 28 pro fights, most of them in the UFC",
      "Can finish standing (8 KOs) or on the mat (5 submissions)"],
    weaknesses: ["Lost his last two, to Gabriel Bonfim and Kevin Holland", "36, against an unbeaten 30-year-old"],
    history: "A veteran welterweight with a 20-8 record and a long UFC run. He's dangerous at range but has lost two straight to top names. This is a must-win to stop the slide." },
  odeosbourne: { name: "Ode Osbourne", ht: 67, reach: 73, nick: "", age: 34, country: "", style: "Long, explosive striker — fast hands and a big reach for 125", strengths: [
      "Six-inch reach advantage (73 inches) over Durden",
      "Fast-twitch athlete with knockout power",
      "Years of UFC experience"],
    weaknesses: ["Inconsistent: 13-9 with two no contests", "Pulled out of this same fight in July with an injury"],
    history: "A veteran flyweight with a 13-9 record (plus two no contests) who has spent years trading wins and losses in the UFC. This fight was first booked for July, until an injury forced him out. Now it's back on, and the books can't split them." },
  codydurden: { name: "Cody Durden", ht: 67, reach: 67, nick: "Custom Made", age: 35, country: "USA", style: "Grinding wrestler — takedowns, pressure and cardio", strengths: [
      "Strong wrestling and top pressure",
      "Experience: 30 pro fights",
      "Tough to finish"],
    weaknesses: ["Lost his last fight to Alessandro Costa by submission in July", "Gives up six inches of reach"],
    history: "A 35-year-old flyweight with an 18-11-1 record who wins by wrestling and wearing opponents down. He was submitted by Alessandro Costa in July. Against a long striker, he has to close the distance and drag the fight to the mat." },
  yanasantos: { name: "Yana Santos", ht: 66, reach: 68, nick: "Foxy", age: 36, country: "Russia", style: "Volume kickboxer — busy hands, sharp counters", strengths: [
      "Ranked in the women's bantamweight top 10",
      "Seven knockout wins",
      "Experience: 26 pro fights against the division's best"],
    weaknesses: ["Ten years older than her opponent", "Can be out-worked by younger, faster strikers"],
    history: "A Russian bantamweight with a 17-8 record (plus one no contest) and a long run near the top of the division. She's been in with almost every big name at 135. Now she faces a rising Brazilian who's ten years younger, and the books favor youth." },
  luanasantos: { name: "Luana Santos", reach: 67, nick: "", age: 26, country: "", style: "Young, aggressive all-rounder — pressure and power", strengths: [
      "11-2 and still improving",
      "Ten years younger than Yana Santos",
      "Big favorite with the oddsmakers"],
    weaknesses: ["Has never faced someone this experienced", "Slightly shorter reach"],
    history: "A young bantamweight with an 11-2 record who is getting her biggest test yet against a ranked veteran. The oddsmakers make her a clear favorite. A win would likely put her into the rankings." },
  jeanpaullebosnoyani: { name: "Jean-Paul Lebosnoyani", ht: 71, reach: 72, nick: "Mufasa", age: 27, country: "USA", style: "Switch-stance striker with quick, varied attacks", strengths: [
      "Only two losses in 13 pro fights",
      "Switches stances to keep opponents guessing",
      "Young and improving fast"],
    weaknesses: ["Still building UFC experience", "Faces an unbeaten opponent"],
    history: "A 27-year-old welterweight with a record around 11-2 who has been climbing steadily. He's a big favorite here against an unbeaten newcomer. Another win starts pushing him toward ranked opposition." },
  farmanhasanov: { name: "Farman Hasanov", reach: 74, nick: "The Lion", age: 31, country: "", style: "Unbeaten pressure fighter", strengths: [
      "Perfect 6-0 record",
      "Longer reach than Lebosnoyani (74 inches)",
      "Nothing to lose as a big underdog"],
    weaknesses: ["Very little high-level experience — just six pro fights", "Big step up in competition"],
    history: "An unbeaten 31-year-old welterweight with a 6-0 record. This is a big jump in competition. The books have him as a big underdog, but unbeaten fighters don't stay unbeaten by accident." },
  jiriprochazka: { name: "Jiří Procházka", reach: 80, nick: "Denisa", age: 34, country: "Czech Republic", style: "Wild, unorthodox striker — hands low, constant forward pressure", strengths: [
      "Finisher: 28 knockouts in 32 wins",
      "Former light heavyweight champion",
      "Huge 80-inch reach and unpredictable angles"],
    weaknesses: ["Knocked out by Carlos Ulberg in round one in April", "Leaves himself open — he gets hit a lot"],
    history: "A Czech former light heavyweight champion and one of the most exciting fighters in the sport, with a 32-6-1 record. He fought Carlos Ulberg for the title in April and was stopped in the first round. Now he faces the hottest unbeaten prospect in the division." },
  navajostirling: { nick: "", name: "Navajo Stirling", age: 28, country: "", style: "Unbeaten, technical kickboxer with heavy hands", strengths: [
      "Perfect 11-0 record",
      "Stopped former champion Jan Blachowicz in round one in August",
      "Young and still getting better"],
    weaknesses: ["First five-round main event", "Has never faced anyone as chaotic as Prochazka"],
    history: "An unbeaten light heavyweight who announced himself by stopping former champion Jan Blachowicz in the first round in Belgrade in August. He's already in the division's top five. Beating Procházka would make him a title contender at 29." },
  waldocortesacosta: { name: "Waldo Cortes-Acosta", ht: 76, reach: 78, nick: "Salsa Boy", age: 35, country: "Dominican Republic", style: "Durable, high-volume heavyweight — steady pressure and cardio", strengths: [
      "Huge work rate for a heavyweight — he keeps throwing for all five rounds",
      "Tough and hard to finish",
      "Ranked in the heavyweight top 10"],
    weaknesses: ["Lost his last two, to Alexander Volkov and Curtis Blaydes", "Gives up two inches of height and four of reach"],
    history: "A Dominican heavyweight who climbed into the rankings with a long winning run, then dropped back-to-back fights to Alexander Volkov in May and Curtis Blaydes in September. He headlines on short notice with a chance to stop the slide." },
  johnnywalker: { name: "Johnny Walker", ht: 78, reach: 82, nick: "", age: 34, country: "Brazil", style: "Wild, athletic striker — spinning attacks, flying knees, big power", strengths: [
      "Huge frame: 6-foot-6 with an 82-inch reach",
      "Knocked out Mick Parkin with a knee in his heavyweight debut (Oct 3)",
      "Explosive — can end a fight with one strike"],
    weaknesses: ["Has been stopped before at light heavyweight", "First five-round heavyweight fight, against a high-volume opponent"],
    history: "A Brazilian who fights out of SBG Ireland and spent years as one of the most unpredictable light heavyweights in the UFC. After losing to Dominick Reyes in April he moved up to heavyweight, and finished Mick Parkin with a knee in under four minutes. Now he gets a ranked heavyweight in a main event." },
  tatianasuarez: { name: "Tatiana Suarez", ht: 65, reach: 66, nick: "", age: 35, country: "USA", style: "Elite wrestler — relentless takedowns and smothering top control", strengths: [
      "One of the best wrestlers in women's MMA",
      "13-1 overall and 9-1 in the UFC",
      "Two-inch reach advantage"],
    weaknesses: ["Injuries have kept her out of the cage for long stretches", "Has to deal with one of the best submission artists at 115"],
    history: "An American wrestler who has dominated almost everyone she's faced, with a 13-1 record. Injuries have slowed her career, but when she's healthy she's a title contender. A win here puts her right back in line for a shot." },
  virnajandiroba: { name: "Virna Jandiroba", ht: 63, reach: 64, nick: "", age: 38, country: "Brazil", style: "Jiu-jitsu ace — dangerous submissions from her back and on top", strengths: [
      "Elite submissions: dangerous anywhere on the mat",
      "Experience: 27 pro fights, 23 wins",
      "Former strawweight title challenger"],
    weaknesses: ["38 years old", "Gives up wrestling to one of the best takedown artists in the division"],
    history: "A Brazilian jiu-jitsu specialist with a 23-4 record who has fought for the strawweight title. She's at her most dangerous when opponents take her down — which is exactly what Suarez wants to do. That makes this a fascinating grappling chess match." },
});

/* ============ MATCHUP NOTES — main-card fights on current cards ============ */
Object.assign(MATCHUPS, {
  "renatomoicano|tomnolan": { odds: "Nolan -122, Moicano +102 — basically a pick 'em; Nolan opened at -170",
    note: "Experience against momentum, over five rounds. Moicano has the jab, the grappling and years against the division's best. Nolan is a tall, aggressive 26-year-old on a five-fight streak, getting the biggest test of his career. If Nolan's length keeps Moicano at the end of punches, the young man is live; if Moicano gets to his back, it's a long night for the Australian." },
  "loneerkavanagh|ramazantemirov": { odds: "Temirov -115, Kavanagh -105",
    note: "Speed vs power at flyweight. Kavanagh is the faster, more technical striker with wrestling to fall back on; Temirov is a short, explosive puncher who wants to get close and end it early. Both are fighting for a top-10 spot. If Kavanagh keeps it at range and stays busy, he wins rounds; if Temirov lands first, it may not last long." },
  "alexandervolkov|rizvankuniev": { odds: "Volkov -130, Kuniev +110",
    note: "The tall kickboxer against the wrestler. Volkov wants to keep Kuniev on the end of long punches and kicks. Kuniev wants to close the distance, clinch and drag him down for ground-and-pound. Volkov has seen every style in 51 fights, but a heavyweight wrestler is always dangerous." },
  "aaronpico|losenekeita": { odds: "Keita -125, Pico +105",
    note: "A late change: Arnold Allen pulled out injured and Keita jumped in after his knockout in Paris. Pico is the better wrestler and hits hard; Keita is longer and comes in hot. The books lean slightly to the short-notice replacement. Watch whether Pico can take him down early." },
  "cirylgane|joshhokit": { title: "Heavyweight title", odds: "Gane -243, Hokit +203",
    note: "Striker vs wrestler, five rounds. Gane will try to stay at range with his reach and footwork and pick Hokit apart. Hokit needs to close the distance, get his hands on Gane and drag him down — he's never been beaten and finishes almost everyone he fights. If Gane's takedown defense holds, the champ should win comfortably; if Hokit gets him down early, this gets very interesting." },
  "amandanunes|kaylaharrison": { title: "Women's bantamweight title", odds: "Harrison -190, Nunes +161",
    note: "The biggest women's fight in years. Harrison is younger and bigger, with Olympic judo that has made her almost impossible to fight on the inside. Nunes is the greatest ever and the better striker, but she hasn't fought in three years. Nunes needs to keep it standing and land early; once Harrison gets a grip, it's her fight." },
  "caioborralho|yousribelgaroui": { odds: "Borralho -120, Belgaroui +103 — the closest fight on the card",
    note: "The all-rounder against the giant kickboxer. Belgaroui is 6-foot-6 with a 79-inch reach and three Glory title fights behind him; at range he's very dangerous. Borralho wants to close the distance, wrestle and make him work on the mat. If Borralho gets him down, it's his fight; if it stays at kicking range, the upset is on." },
  "kevinholland|urosmedic": { odds: "Medic -165, Holland +140",
    note: "A fun striking matchup at welterweight. Holland has a ten-inch reach advantage and a creative, unpredictable style. Medic is a ranked southpaw puncher with a heavy left hand. Holland needs to keep him on the end of his long shots; Medic needs to walk him down. Somebody is probably getting knocked down." },
  "bilalhasan|luisgurule": { odds: "Hasan -950, Gurule +650 — the biggest favorite on the card",
    note: "A big debut. Hasan is 10-0 with eight knockouts and won his contract in 45 seconds. Gurule is the experienced, scrappy veteran, coming off a quick submission loss. Fans and models both lean heavily toward the newcomer, but UFC debuts at the Garden are a different kind of pressure." },
  "jacobesmith|randybrown": { odds: "Smith -285, Brown +235",
    note: "Short-notice prospect against a long veteran. Smith is 13-0 and wants to close the distance and pressure; Brown is much taller and wants to keep him on the end of long punches and kicks. If Smith gets inside early, his record probably stays perfect. If Brown keeps it at range, the veteran can snap his skid." },
  "codydurden|odeosbourne": { odds: "Osbourne -110, Durden -110 — a true coin flip",
    note: "Striker vs wrestler at flyweight. Osbourne has a six-inch reach advantage and wants to keep Durden on the end of long, fast punches. Durden wants to close the distance, grab a leg and grind. The first takedown attempt tells you who's winning this one." },
  "luanasantos|yanasantos": { odds: "Luana -255, Yana +212",
    note: "Youth against experience, and no relation despite the name. Yana is the ranked veteran with busy kickboxing; Luana is ten years younger and the clear betting favorite. If Yana keeps it at range and out-works her, the upset is there; if Luana pushes the pace, it's her night." },
  "farmanhasanov|jeanpaullebosnoyani": { odds: "Lebosnoyani -278, Hasanov +225",
    note: "A rising welterweight against an unbeaten newcomer. Lebosnoyani is the more polished striker and switches stances to stay unpredictable. Hasanov is 6-0 and has the longer reach. The books expect Lebosnoyani's experience to tell." },
  "jiriprochazka|navajostirling": { odds: "Lines not posted at write-up time",
    note: "Chaos against control, over five rounds. Procházka fights with his hands low and throws from everywhere; he's either knocking you out or getting hit trying. Stirling is unbeaten, younger and more disciplined, and just flattened Jan Blachowicz. If Stirling stays composed and counters, the prospect takes the veteran's spot; if Procházka drags him into a brawl, anything can happen." },
  "johnnywalker|waldocortesacosta": { odds: "Cortes-Acosta -230, Walker +190 — opened even bigger (-300)",
    note: "A short-notice heavyweight main event. Walker is the bigger, more explosive striker, with spinning attacks and knees that can end it in one shot. Cortes-Acosta wants to wear him down with volume and pressure over five rounds. If Walker lands early, it's over fast; if it goes long, Cortes-Acosta's work rate takes over." },
  "tatianasuarez|virnajandiroba": { odds: "Suarez -204, Jandiroba +173",
    note: "Wrestler vs jiu-jitsu ace, between two former title contenders. Suarez will try to take Jandiroba down and keep her there; Jandiroba is happy to go to the mat because she's so dangerous with submissions from her back. If Suarez can control without getting caught, she wins clearly. If Jandiroba catches an arm or neck in a scramble, it's the upset." },
  "alexandervolkanovski|movsarevloev": { title: "Featherweight title", odds: "Volkanovski -110, Evloev -110 — a true coin flip",
    note: "Old guard vs new: Volkanovski, 38 and one of the best featherweights ever, against Movsar Evloev, who is 20-0 and has never really been in trouble. It's the classic striker-vs-wrestler question — Evloev wants to smother him for 25 minutes, Volkanovski wants to make it a fight. Evloev has waited years for this shot." },
  "merabdvalishvili|petryan": { title: "Bantamweight title", odds: "Yan -180, Dvalishvili +155",
    note: "The rubber match, and it's 1-1. Dvalishvili won the first in 2023 by swarming Yan with takedowns; Yan won the rematch in December and took his belt. Dvalishvili's pace and takedown volume against Yan's precision boxing — whoever leaves Abu Dhabi with the belt has Song Yadong waiting, who knocked out Umar Nurmagomedov and demanded the next shot." },
});

/* ============ EVENT META — which fights are the main card ============ */
EVENT_META.push(
  { match: ["ufc 333", "volkanovski vs. evloev", "volkanovski vs evloev"], titles: "2 title fights",
    note: "<b>Volkanovski dropped Movsar Evloev with a left hand and stopped him at 4:54 of round two</b> — the first loss of Evloev's career, and one more defense ties José Aldo's record. <b>Petr Yan beat Merab Dvalishvili 48-47 on all three cards</b> after losing the first two rounds, winning the trilogy 2-1 (Fight of the Night). Lone'er Kavanagh knocked out Ramazan Temirov in round one, Alexander Volkov out-pointed Rizvan Kuniev, and Aaron Pico stopped short-notice Losene Keita in 74 seconds.",
    mainCard: ["alexandervolkanovski|movsarevloev", "merabdvalishvili|petryan", "loneerkavanagh|ramazantemirov", "alexandervolkov|rizvankuniev", "aaronpico|losenekeita"] },
  { match: ["moicano vs. nolan", "moicano vs nolan"], titles: "",
    note: "<b>Tom Nolan stopped Renato Moicano at 1:28 of round three</b> — he survived Moicano's back-takes early (helped by a controversial referee stand-up in round two), then hurt him with a knee and finished with elbows. Six straight wins for the 26-year-old Australian. Unbeaten Jacobe Smith beat Randy Brown 30-26 on all three cards on 12 days' notice; Cody Durden out-pointed Ode Osbourne, Luana Santos beat Yana Santos, and Jean-Paul Lebosnoyani won by doctor's stoppage over Farman Hasanov.",
    mainCard: ["renatomoicano|tomnolan", "jacobesmith|randybrown", "codydurden|odeosbourne", "luanasantos|yanasantos", "farmanhasanov|jeanpaullebosnoyani"] },
  { match: ["cortes-acosta vs. walker", "cortes-acosta vs walker", "cortes acosta vs. walker", "acosta vs. walker", "bonfim vs. brady"], titles: "",
    note: "Nov 7 at the Meta APEX: the original main event fell apart when Sean Brady pulled out with a staph infection (Bonfim is expected to be rebooked). In its place, a five-round heavyweight fight: ranked veteran Waldo Cortes-Acosta against Johnny Walker, fresh off a one-knee knockout in his heavyweight debut. Tatiana Suarez vs Virna Jandiroba, two former strawweight title challengers, is the co-main.",
    mainCard: ["johnnywalker|waldocortesacosta", "tatianasuarez|virnajandiroba"] },
  { match: ["adesanya vs. magomedov", "adesanya vs magomedov"], titles: "",
    note: "Dec 5 in Riyadh (reported, not yet official): former middleweight champion Israel Adesanya returns against Shara Magomedov. Breakdowns once the card is confirmed.",
    mainCard: ["israeladesanya|sharamagomedov"] },
  { match: ["ufc 334", "gane vs. hokit", "gane vs hokit"], titles: "2 title fights",
    note: "Madison Square Garden: new heavyweight champion Ciryl Gane's first defense against unbeaten wrestler Josh Hokit, and Kayla Harrison vs Amanda Nunes for the women's bantamweight belt — Nunes coming out of retirement. Also on the main card: Caio Borralho vs Yousri Belgaroui, Kevin Holland vs Uros Medic, and Bilal Hasan vs Luis Gurule. Stephen \"Wonderboy\" Thompson has his final fight on the prelims.",
    mainCard: ["cirylgane|joshhokit", "amandanunes|kaylaharrison", "caioborralho|yousribelgaroui", "kevinholland|urosmedic", "bilalhasan|luisgurule"] },
  { match: ["prochazka vs. stirling", "prochazka vs stirling", "procházka vs. stirling"], titles: "",
    note: "Doha, Qatar: former light heavyweight champion Jiří Procházka against unbeaten Navajo Stirling (11-0), who stopped Jan Blachowicz in August, in a five-round main event. An early start for US fans. The rest of the card is still being built.",
    mainCard: ["jiriprochazka|navajostirling"] }
);

/* ============ FALLBACK SNAPSHOT (if live feed unreachable) ============ */
(function () {
  const F = (weight, n1, r1, n2, r2) => ({ weight, f1: { name: n1, record: r1, winner: false }, f2: { name: n2, record: r2, winner: false }, done: false, live: false });
  FALLBACK_EVENTS.push(
    { name: "UFC Fight Night: Cortes-Acosta vs. Walker", date: "2026-11-07T22:00Z", venue: "Meta APEX, Las Vegas", fights: [
      F("Heavyweight", "Waldo Cortes-Acosta", "", "Johnny Walker", ""),
      F("W Strawweight", "Tatiana Suarez", "13-1-0", "Virna Jandiroba", "23-4-0"),
      F("Middleweight", "Mantas Kondratavicius", "", "Wesley Schultz", ""),
      F("Light Heavyweight", "Billy Elekana", "", "Lucas Fernando", "")
    ]},
    { name: "UFC 334: Gane vs. Hokit", date: "2026-11-15T02:00Z", venue: "Madison Square Garden, New York", fights: [
      F("Heavyweight", "Ciryl Gane", "14-2-0", "Josh Hokit", "10-0-0"),
      F("W Bantamweight", "Kayla Harrison", "19-1-0", "Amanda Nunes", "23-5-0"),
      F("Middleweight", "Caio Borralho", "", "Yousri Belgaroui", ""),
      F("Welterweight", "Kevin Holland", "", "Uros Medic", ""),
      F("Flyweight", "Bilal Hasan", "", "Luis Gurule", ""),
      F("Welterweight", "Stephen Thompson", "", "Charles Radtke", ""),
      F("Lightweight", "Drew Dober", "", "Chris Duncan", ""),
      F("Lightweight", "Jim Miller", "", "Terrance McKinney", "")
    ]},
    { name: "UFC Fight Night: Procházka vs. Stirling", date: "2026-11-21T18:00Z", venue: "ABHA Arena, Doha", fights: [
      F("Light Heavyweight", "Jiří Procházka", "32-6-1", "Navajo Stirling", "11-0-0")
    ]}
  );
})();
/* ============ BELTS & RANKINGS (men's divisions; current as of ANALYSIS_STAMP) ============ */
DIVISIONS.men = [
  { name: "Heavyweight", weight: "265 lb", champ: { name: "Ciryl Gane", record: "14-2", country: "France" },
    beltFacts: "<b>Ciryl Gane, promoted to undisputed champion</b> in September after Tom Aspinall gave up the belt — the eye injury from their October 2025 fight (an accidental eye poke, ruled a no contest) never healed after multiple surgeries. Gane had won the interim belt by stopping Alex Pereira at the White House in June. <b>First defense: Josh Hokit at UFC 334, Nov 14, Madison Square Garden.</b>",
    top5: [{ rank: 1, name: "Tom Aspinall", record: "15-3" }, { rank: 2, name: "Alexander Volkov", record: "41-11" }, { rank: 3, name: "Alex Pereira", record: "13-4" }, { rank: 4, name: "Sergei Pavlovich", record: "21-3" }, { rank: 5, name: "Josh Hokit", record: "10-0" }],
    story: "Dana White first said Gane would have to win the vacant belt in a fight, then the UFC reversed course and simply named him champion. His first defense is against <b>unbeaten Josh Hokit</b> (10-0, ranked just outside the top five), a former Fresno State wrestler who's 4-0 in the UFC — including a knockout of Derrick Lewis. Gane is a clear favorite (around -235). Aspinall says he isn't retiring and hopes to return in 2027. Below them, <b>Alexander Volkov jumped to #2</b> after out-pointing Rizvan Kuniev at UFC 333, and <b>Alex Pereira fights Sergei Pavlovich at UFC 335 in December</b>." },
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
  { name: "Featherweight", weight: "145 lb", champ: { name: "Alexander Volkanovski", record: "29-4", country: "Australia" },
    beltFacts: "Regained the vacant belt in April 2025, beat Diego Lopes again in Jan 2026, then <b>knocked out unbeaten Movsar Evloev at UFC 333</b> (Oct 24). <b>2 defenses</b> this reign — one more ties José Aldo's featherweight record.",
    top5: [{ rank: 1, name: "Movsar Evloev", record: "20-1" }, { rank: 2, name: "Diego Lopes", record: "28-8" }, { rank: 3, name: "Lerone Murphy", record: "17-1-1" }, { rank: 4, name: "Aljamain Sterling", record: "26-5" }, { rank: 5, name: "Yair Rodriguez", record: "21-5" }],
    story: "<b>Volkanovski, 38, stopped Evloev in round two</b> — the 20-0 wrestler's first loss — and keeps proving the age questions wrong. Who's next is wide open: he has floated a farewell superfight with lightweight champ Justin Gaethje, while Diego Lopes and Lerone Murphy wait at featherweight." },
  { name: "Bantamweight", weight: "135 lb", champ: { name: "Petr Yan", record: "21-5", country: "Russia" },
    beltFacts: "Regained the belt in Dec 2025 with a decision over Merab Dvalishvili, then <b>beat him again at UFC 333</b> (Oct 24, 48-47 on all three cards) to win their trilogy 2-1. <b>1 defense</b> this reign.",
    top5: [{ rank: 1, name: "Merab Dvalishvili", record: "21-6" }, { rank: 2, name: "Sean O'Malley", record: "20-3" }, { rank: 3, name: "Song Yadong", record: "24-9-1" }, { rank: 4, name: "Umar Nurmagomedov", record: "20-2" }, { rank: 5, name: "Mario Bautista", record: "18-3" }],
    story: "<b>Yan settled the rivalry at UFC 333</b>: down two rounds on every card, he took the last three to beat Dvalishvili for the second fight in a row. Next in line is likely <b>Song Yadong</b>, who knocked out Umar Nurmagomedov in August with a second-round uppercut and has been demanding a title shot ever since." },
  { name: "Flyweight", weight: "125 lb", champ: { name: "Joshua Van", record: "18-2", country: "Myanmar/USA" },
    beltFacts: "Won the belt in Dec 2025 — a 26-second TKO when Pantoja's arm gave out — defended with a round-5 TKO of Tatsuro Taira in May, then <b>settled it for real at UFC 331 on Sep 19: a clean five-round decision over Pantoja</b>. 2 defenses.",
    top5: [{ rank: 1, name: "Manel Kape", record: "23-7" }, { rank: 2, name: "Alexandre Pantoja", record: "30-7" }, { rank: 3, name: "Brandon Royval", record: "18-9" }, { rank: 4, name: "Tatsuro Taira", record: "18-2" }, { rank: 5, name: "Lone'er Kavanagh", record: "11-2" }],
    story: "At 24, Van is <b>the youngest champion on the roster</b> and, after out-striking Pantoja for 25 minutes, a top-five pound-for-pound fighter on most media lists. Pantoja slid to #2 behind <b>Manel Kape, the obvious next challenger</b>. A Van–Kape fight would be the first real test of whether anyone at 125 can slow him down." }
];
P4P.explain = "<b>Pound-for-pound</b> is a fun, hypothetical ranking: who's the best fighter if weight didn't matter? It compares champions and stars across divisions by skill and résumé. No belt attached — pure bragging rights.";
P4P.men = [{ name: "Islam Makhachev", record: "29-1" }, { name: "Alexander Volkanovski", record: "29-4" }, { name: "Petr Yan", record: "21-5" }, { name: "Joshua Van", record: "18-2" }, { name: "Justin Gaethje", record: "28-5" }, { name: "Ilia Topuria", record: "17-1" }, { name: "Tom Aspinall", record: "15-3" }, { name: "Sean Strickland", record: "31-7" }, { name: "Merab Dvalishvili", record: "21-6" }, { name: "Arman Tsarukyan", record: "24-3" }];

/* ============ STORYLINES & UFC 101 ============ */
STORYLINES.push(
  { em: "🎃", title: "Halloween: Tom Nolan arrives", body: [
    "<b>Tom Nolan stopped Renato Moicano in round three</b> — his sixth straight win and the biggest of his career. Moicano nearly had him early with back-takes, and the referee's stand-up in round two drew plenty of criticism, but Nolan finished it clean with a knee and elbows. At 26, the Australian is now a real name at lightweight.",
    "Next Saturday's card changed too: <b>Sean Brady pulled out with a staph infection</b>, so Waldo Cortes-Acosta vs Johnny Walker is the new heavyweight main event."] },
  { em: "🐐", title: "Makhachev owns the record books", body: [
    "At UFC 330 Islam Makhachev out-pointed Ian Machado Garry for his first welterweight defense and his <b>17th straight UFC win — breaking Anderson Silva's all-time record</b> (16) that stood for 14 years. He named <b>Carlos Prates</b> as the most deserving next challenger, waved off unbeaten Michael Morales, and hinted he misses lightweight — where a Topuria superfight still lurks."] },
  { em: "🏆", title: "UFC 333: both champs hold on", body: [
    "<b>Alexander Volkanovski, 38, knocked out unbeaten Movsar Evloev in round two</b> — dropping him with a left and finishing him at 4:54. It's Evloev's first loss in 21 fights, and one more defense would tie José Aldo's featherweight record. Volkanovski has floated a farewell superfight with lightweight champ Justin Gaethje.",
    "In the co-main, <b>Petr Yan lost the first two rounds to Merab Dvalishvili on every card, then won the last three</b> to take the trilogy 2-1 and keep his bantamweight belt. Song Yadong is waiting."] },
  { em: "👑", title: "Heavyweight has a new king: Ciryl Gane", body: [
    "Tom Aspinall gave up the heavyweight belt in September — the eye injury from his October 2025 fight with Gane never fully healed. After first saying Gane would have to fight for the vacant title, the UFC simply <b>promoted Gane to undisputed champion</b>.",
    "His first defense: <b>unbeaten wrestler Josh Hokit at UFC 334, Nov 14 at Madison Square Garden</b>, with Kayla Harrison vs a returning Amanda Nunes for the women's bantamweight belt as the co-main."] },
  { em: "🧊", title: "Light heavyweight is frozen", body: [
    "Champion Carlos Ulberg <b>tore his ACL winning the belt</b> and now says he's targeting an early-2027 return. There has been talk of an interim title while he heals, but nothing is booked, and #1 contender Ankalaev is stuck waiting either way."] },
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
    "Rizvan Kuniev": "4001837", // Oct 18, from his espn.com/mma/fighter/_/id profile URL
    "Lone'er Kavanagh": "5147737", // Oct 29, from espn.com/mma/fighter/_/id/5147737/loneer-kavanagh
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
    "Ilia Topuria": "4350812", "Merab Dvalishvili": "3948572", "Alex Pereira": "4705658", "Khamzat Chimaev": "4684751",
    // Nov 5: offline-snapshot fighters, each from their espn.com/mma/fighter/_/id profile URL
    "Johnny Walker": "3146944", "Tatiana Suarez": "4020435", "Virna Jandiroba": "4289516", "Mantas Kondratavicius": "5264925",
    "Wesley Schultz": "5057023", "Wes Schultz": "5057023", "Billy Elekana": "5078114", "Lucas Fernando": "5119021",
    "Kayla Harrison": "4332765", "Amanda Nunes": "2516131", "Kevin Holland": "3943695", "Uros Medic": "4685870",
    "Bilal Hasan": "5264405", "Luis Gurule": "5218137", "Stephen Thompson": "2615077", "Charles Radtke": "4416297",
    "Drew Dober": "2951202", "Jim Miller": "2335718", "Terrance McKinney": "4425604"
  };
  Object.keys(RAW).forEach(n => { ESPN_IDS[norm(n)] = RAW[n]; });
})();
