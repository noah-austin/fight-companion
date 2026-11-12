/* =====================================================================
   Fight Companion — baked data. THE REFRESH EDITS ONLY THIS FILE.
   Shapes are documented in CLAUDE.md ("Baked data blocks"). The containers
   (FIGHTERS, MATCHUPS, ...) and helpers like norm() are declared in app.js,
   which loads first; the page boots after this file runs.
   ===================================================================== */
const ANALYSIS_STAMP = "November 12, 2026";

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
  alexandervolkov: { name: "Alexander Volkov", ht: 79, reach: 80, nick: "Drago", age: 37, country: "Russia", style: "Tall, technical kickboxer — keeps opponents on the end of long strikes", strengths: [
      "Huge size: 6-foot-7 with an 80-inch reach",
      "Experience: 51 pro fights and a top-five heavyweight for years",
      "Beat Waldo Cortes Acosta by decision in May"],
    weaknesses: ["Can be taken down and held by strong wrestlers", "37, facing a younger, rising contender"],
    history: "A Russian veteran with a 40-11 record and one of the most consistent heavyweights of the last decade. He's never won the belt but always seems to be near the top. Beat Waldo Cortes Acosta in May and is the favorite here." },
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
    weaknesses: ["Lost his last three, most recently to Johnny Walker on Nov 7", "Gives up two inches of height and four of reach"],
    history: "A Dominican heavyweight who climbed into the rankings with a long winning run, then dropped back-to-back fights to Alexander Volkov in May and Curtis Blaydes in September. He took the Nov 7 main event on short notice and was stopped by Johnny Walker in round three after leading on the cards — his third straight loss." },
  johnnywalker: { name: "Johnny Walker", ht: 78, reach: 82, nick: "", age: 34, country: "Brazil", style: "Wild, athletic striker — spinning attacks, flying knees, big power", strengths: [
      "Huge frame: 6-foot-6 with an 82-inch reach",
      "Knocked out Mick Parkin with a knee in his heavyweight debut (Oct 3)",
      "Explosive — can end a fight with one strike"],
    weaknesses: ["Has been stopped before at light heavyweight", "First five-round heavyweight fight, against a high-volume opponent"],
    history: "A Brazilian who fights out of SBG Ireland and spent years as one of the most unpredictable light heavyweights in the UFC. After losing to Dominick Reyes in April he moved up to heavyweight, and finished Mick Parkin with a knee in under four minutes. On Nov 7 he took the short-notice main event and rallied to stop Cortes-Acosta in round three." },
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
  aljamainsterling: { name: "Aljamain Sterling", ht: 67, reach: 71, nick: "", country: "USA", style: "Grappler — relentless wrestling and back-takes", strengths: [
      "Former UFC bantamweight champion",
      "Elite at taking the back and keeping it",
      "Beat Brian Ortega by decision in August 2025"],
    weaknesses: ["Can get tagged on the feet by sharp strikers", "Facing a younger, harder-hitting opponent"],
    history: "A former UFC bantamweight champion who moved up to featherweight and is now ranked in the top five there. His game is simple and hard to stop: take you down, take your back, grind you out. He beat Brian Ortega last year and now meets one of the division's hottest young strikers." },
  kevinvallejos: { name: "Kevin Vallejos", ht: 67, reach: 68, nick: "El Chino", country: "Argentina", style: "Aggressive young striker — high volume and real power", strengths: [
      "18-1 and unbeaten in the UFC",
      "Knocked out Josh Emmett in round one in March, and Giga Chikadze before that",
      "Throws a lot — over six significant strikes a minute"],
    weaknesses: ["Has never faced a grappler like Sterling", "Gives up three inches of reach"],
    history: "An Argentine featherweight in his mid-20s who has won every fight since joining the UFC. He knocked out Giga Chikadze in December 2025 and stopped veteran Josh Emmett in the first round in March. Sterling is the big step up." },
  kyojihoriguchi: { name: "Kyoji Horiguchi", ht: 64, nick: "", country: "Japan", style: "Lightning-fast karate-style striker — blitzes in and out", strengths: [
      "Former Rizin and Bellator champion",
      "Speed and footwork few flyweights can match",
      "Beat Amir Albazi in his UFC return"],
    weaknesses: ["Stopped by Manel Kape in round three in June", "Rarely goes for submissions"],
    history: "A Japanese veteran who trains at American Top Team. He fought Demetrious Johnson for the UFC title back in 2015, then won belts in Rizin and Bellator. He returned to the UFC this year, beat Amir Albazi, then lost to Manel Kape in June." },
  asualmabayev: { name: "Asu Almabayev", ht: 64, reach: 65, nick: "Zulfikar", age: 32, country: "Kazakhstan", style: "Grappler — wrestling and submissions", strengths: [
      "Submitted his last two opponents, Alex Perez and Charles Johnson",
      "Keeps grinding with takedowns",
      "24-3 record"],
    weaknesses: ["Stopped by Manel Kape in a 2025 main event", "Less active on the feet than Horiguchi"],
    history: "A Kazakh flyweight who bounced back from a stoppage loss to Manel Kape in March 2025 by submitting Alex Perez and then Charles Johnson in June. Beating a former two-promotion champion would put him right back in the title picture." },
  danhooker: { name: "Dan Hooker", ht: 72, reach: 75, nick: "The Hangman", age: 36, country: "New Zealand", style: "Tall, rangy striker with knees and elbows", strengths: [
      "Big reach edge: 75 inches to Ortega's 69",
      "Huge experience against the best lightweights",
      "Never in a boring fight"],
    weaknesses: ["Three straight stoppage losses", "Fighting again only weeks after being knocked out in September"],
    history: "A New Zealander from City Kickboxing and one of the most fan-friendly lightweights of the past decade. The last year has been rough: losses to Arman Tsarukyan, Benoît Saint Denis and, in September, Salahdine Parnasse. He asked for a quick turnaround to fight Ortega." },
  brianortega: { name: "Brian Ortega", ht: 68, reach: 69, nick: "", country: "USA", style: "Jiu-jitsu ace who can win from bad positions", strengths: [
      "Dangerous submissions from anywhere",
      "Twice fought for the featherweight title"],
    weaknesses: ["Hasn't fought since losing to Aljamain Sterling in August 2025", "Gives up four inches of height and six of reach"],
    history: "A jiu-jitsu specialist and two-time featherweight title challenger (Max Holloway in 2018, Alexander Volkanovski in 2021). He lost to Aljamain Sterling in August 2025, then pulled out of a fight with Renato Moicano in March. This is his long-delayed move up to lightweight." },
  ikramaliskerov: { name: "Ikram Aliskerov", ht: 72, reach: 76, nick: "", age: 33, country: "Russia", style: "Accurate, powerful striker with a wrestling base", strengths: [
      "Lands about 64% of his strikes",
      "Very hard to take down",
      "Beat Brunno Ferreira by decision in June"],
    weaknesses: ["Lost to Robert Whittaker in his one big main-event chance (2024)"],
    history: "A Russian middleweight who has lost only twice: to Khamzat Chimaev back in 2019 and to Robert Whittaker in 2024. He beat Brunno Ferreira in June. A win over a former title challenger would push him up the rankings." },
  jaredcannonier: { name: "Jared Cannonier", ht: 71, reach: 77, nick: "The Killa Gorilla", country: "USA", style: "Powerful counter-striker with heavy leg kicks", strengths: [
      "Former middleweight title challenger (vs Israel Adesanya, 2022)",
      "Real power — 11 knockout wins"],
    weaknesses: ["Lost four of his last five"],
    history: "Once over 300 pounds, he lost more than 100 to chase a fight career, debuted in the UFC at heavyweight in 2015 and worked his way down to middleweight, where he fought Israel Adesanya for the title. He's lost four of his last five, most recently to Christian Leroy Duncan in July." },
  charlesoliveira: { name: "Charles Oliveira", ht: 70, reach: 74, nick: "Do Bronx", country: "Brazil", style: "Jiu-jitsu master with dangerous, improved striking", strengths: [
      "World-class submissions — he can finish from any position",
      "Former lightweight champion and current BMF titleholder",
      "Dominated Max Holloway 50-45 on every card in March"],
    weaknesses: ["Can be hurt early on the feet", "Gives up an inch of height"],
    history: "A Brazilian former lightweight champion and one of the most exciting finishers in UFC history. In March he beat Max Holloway on all three cards at UFC 326 to win the BMF belt — the first man to hold both that and the undisputed lightweight title. Now he defends it against another aggressive Brazilian." },
  diegolopes: { name: "Diego Lopes", ht: 71, reach: 72, nick: "", style: "Aggressive all-rounder — wild striking and slick submissions", strengths: [
      "Always pushing forward; never in a dull fight",
      "Dangerous jiu-jitsu off his back and in scrambles",
      "TKO'd Steve Garcia in round two on the White House card in June"],
    weaknesses: ["Lost twice to Alexander Volkanovski for the featherweight title", "Moving up to 155 against a bigger, more experienced grappler"],
    history: "A featherweight contender who fought Alexander Volkanovski for the title twice — in April 2025 and again at UFC 325 in January — and lost both on the cards. He bounced back by stopping Steve Garcia at the White House card in June. Now he moves up to lightweight for the BMF belt." },
  alexpereira: { name: "Alex Pereira", ht: 76, reach: 79, nick: "Poatan", country: "Brazil", style: "Kickboxing knockout artist — left hook and leg kicks", strengths: [
      "One of the hardest one-punch knockouts in the sport",
      "Former champion at middleweight and light heavyweight",
      "Calm under fire; fights like a veteran kickboxer"],
    weaknesses: ["Knocked out by Ciryl Gane in his heavyweight debut in June", "Gives up five inches of reach to Pavlovich"],
    history: "A Brazilian former kickboxing champion who won UFC titles at middleweight and light heavyweight. He moved up to heavyweight for an interim title fight with Ciryl Gane at UFC Freedom 250 in June and was knocked out. This is his second try at the big boys." },
  sergeipavlovich: { name: "Sergei Pavlovich", ht: 75, reach: 84, nick: "", country: "Russia", style: "Heavy-handed pressure puncher", strengths: [
      "Huge 84-inch reach",
      "Frightening power — knocked out Tallison Teixeira in 39 seconds in May",
      "Ranked in the heavyweight top five"],
    weaknesses: ["Facing a former two-division champion with real counter power"],
    history: "A Russian heavyweight known for finishing people fast. He's 21-3 and knocked out Tallison Teixeira in 39 seconds in Macau in May. A win over a former two-division champion would put him back near the front of the title line." },
  brandonmoreno: { name: "Brandon Moreno", ht: 67, reach: 70, nick: "The Assassin Baby", age: 32, country: "Mexico", style: "Well-rounded veteran — good boxing, scrappy grappling", strengths: [
      "Former flyweight champion — the first Mexican-born UFC champ",
      "Huge experience in five-round title fights",
      "Back in the win column after a split decision in September"],
    weaknesses: ["Lost two of his last three, including a knockout loss to Tatsuro Taira", "Has taken a lot of damage over a long career"],
    history: "A Mexican flyweight who won the UFC title from Deiveson Figueiredo in 2021 and lost it to Alexandre Pantoja in 2023. After losses to Tatsuro Taira and Lone'er Kavanagh, he edged Joseph Morales on the Noche UFC card in September." },
  charlesjohnson: { name: "Charles Johnson", ht: 69, reach: 70, nick: "InnerG", country: "USA", style: "Busy switch-stance striker", strengths: [
      "Volume striker who switches stances to confuse opponents",
      "Former LFA flyweight champion",
      "Taller than Moreno"],
    weaknesses: ["Submitted by Asu Almabayev in June", "Big step up in competition"],
    history: "An American flyweight who won the LFA title before joining the UFC. His 2026 has been mixed, with losses to Alex Perez in January and Asu Almabayev in June. A win over a former champion would be the biggest of his career." },
  joepyfer: { name: "Joe Pyfer", ht: 74, reach: 75, nick: "Bodybagz", country: "USA", style: "Heavy-handed pressure fighter", strengths: [
      "Stopped Israel Adesanya in round two in March — the biggest win of his career",
      "Real knockout power in both hands",
      "Three straight wins"],
    weaknesses: ["Facing an elite wrestler", "Lost a decision to Jack Hermansson in 2024"],
    history: "An American middleweight who's on the best run of his career: a decision over Kelvin Gastelum, a submission of Abus Magomedov, then a knockout of former champion Israel Adesanya in Seattle in March. He's 16-3." },
  bonickal: { name: "Bo Nickal", ht: 73, reach: 76, nick: "", country: "USA", style: "Elite wrestler with growing knockout power", strengths: [
      "Won the Hodge Trophy, college wrestling's top prize, at Penn State",
      "Knocked out his last two opponents",
      "Slight reach edge"],
    weaknesses: ["Knocked out by Reinier de Ridder in May 2025, his only loss", "Still young as a striker"],
    history: "A star college wrestler from Penn State who came to the UFC through the Contender Series. His only loss is a 2025 knockout by Reinier de Ridder; since then he's knocked out Rodolfo Vieira and Kevin Daukaus. He's 9-1." },
  israeladesanya: { name: "Israel Adesanya", ht: 76, reach: 80, nick: "The Last Stylebender", country: "New Zealand", style: "Elite kickboxer — long, precise and hard to hit", strengths: [
      "Two-time middleweight champion",
      "Huge reach advantage: 80 inches to Magomedov's 73",
      "Some of the best striking technique in UFC history"],
    weaknesses: ["Lost four straight, the last by knockout", "Five losses in his last six fights"],
    history: "Born in Nigeria and raised in New Zealand, he ruled the middleweight division for years and beat Alex Pereira to win back the belt in 2023. Since then he's lost to Sean Strickland, Dricus du Plessis, Nassourdine Imavov and, in March, Joe Pyfer. This fight may decide how long he keeps going." },
  sharamagomedov: { name: "Shara Magomedov", ht: 74, reach: 73, nick: "", age: 32, country: "Russia", style: "Power striker — most of his wins are knockouts", strengths: [
      "17-1 with 12 knockouts",
      "Beat Michel Pereira by decision in June",
      "Younger and fresher than Adesanya"],
    weaknesses: ["Only loss was to Michael Page, a slick long-range striker", "Gives up seven inches of reach"],
    history: "A Russian middleweight who has won 17 of 18 pro fights, 12 by knockout. His only defeat came against Michael Page in February 2025; since then he's beaten Marc-André Barriault and Michel Pereira. He called for this fight with Adesanya and got it." },
  ianmachadogarry: { name: "Ian Machado Garry", nick: "The Future", country: "Ireland", style: "Long, quick counter-striker", strengths: [
      "Fought for the welterweight title in August",
      "Fast, accurate striking from range",
      "Ranked near the top of the division"],
    weaknesses: ["Lost a decision to Islam Makhachev at UFC 330", "Facing a top-level wrestler"],
    history: "An Irish welterweight who climbed fast and earned a title shot against Islam Makhachev at UFC 330 in August, losing on the cards. This is his first fight back, against one of the best wrestlers outside the UFC's top tier." },
  yaroslavamosov: { name: "Yaroslav Amosov", nick: "", age: 33, country: "Ukraine", style: "Suffocating wrestler and grappler", strengths: [
      "30-1 — one loss in his entire career",
      "Former Bellator welterweight champion",
      "Submitted his last opponent at UFC 328 in May"],
    weaknesses: ["Only loss was a knockout, to Jason Jackson in 2023", "Has never faced a UFC striker this good"],
    history: "A Ukrainian former Bellator welterweight champion who stepped away from MMA to help defend his country, then came back and kept winning. He's 2-0 in the UFC, most recently with a submission at UFC 328. Beating Garry would make him a contender." },
});

/* ============ MATCHUP NOTES — main-card fights on current cards ============ */
Object.assign(MATCHUPS, {
  "cirylgane|joshhokit": { title: "Heavyweight title", odds: "Gane -210, Hokit +170 — money has come in on Hokit this week",
    note: "Striker vs wrestler, five rounds. Gane will try to stay at range with his reach and footwork and pick Hokit apart. Hokit needs to close the distance, get his hands on Gane and drag him down — he's never been beaten and finishes almost everyone he fights. If Gane's takedown defense holds, the champ should win comfortably; if Hokit gets him down early, this gets very interesting." },
  "amandanunes|kaylaharrison": { title: "Women's bantamweight title", odds: "Harrison -192, Nunes +160",
    note: "The biggest women's fight in years. Harrison is younger and bigger, with Olympic judo that has made her almost impossible to fight on the inside. Nunes is the greatest ever and the better striker, but she hasn't fought in three years. Nunes needs to keep it standing and land early; once Harrison gets a grip, it's her fight." },
  "caioborralho|yousribelgaroui": { odds: "Borralho -155, Belgaroui +130 — Borralho has been bet up from -120",
    note: "The all-rounder against the giant kickboxer. Belgaroui is 6-foot-6 with a 79-inch reach and three Glory title fights behind him; at range he's very dangerous. Borralho wants to close the distance, wrestle and make him work on the mat. If Borralho gets him down, it's his fight; if it stays at kicking range, the upset is on." },
  "kevinholland|urosmedic": { odds: "Medic -165, Holland +140",
    note: "A fun striking matchup at welterweight. Holland has a ten-inch reach advantage and a creative, unpredictable style. Medic is a ranked southpaw puncher with a heavy left hand. Holland needs to keep him on the end of his long shots; Medic needs to walk him down. Somebody is probably getting knocked down." },
  "bilalhasan|luisgurule": { odds: "Hasan -950, Gurule +650 — the biggest favorite on the card",
    note: "A big debut. Hasan is 10-0 with eight knockouts and won his contract in 45 seconds. Gurule is the experienced, scrappy veteran, coming off a quick submission loss. Fans and models both lean heavily toward the newcomer, but UFC debuts at the Garden are a different kind of pressure." },
  "jiriprochazka|navajostirling": { odds: "Stirling -138, Procházka +110 — the unbeaten prospect is the favorite",
    note: "Chaos against control, over five rounds. Procházka fights with his hands low and throws from everywhere; he's either knocking you out or getting hit trying. Stirling is unbeaten, younger and more disciplined, and just flattened Jan Blachowicz. If Stirling stays composed and counters, the prospect takes the veteran's spot; if Procházka drags him into a brawl, anything can happen." },
  "johnnywalker|waldocortesacosta": { odds: "Cortes-Acosta -230, Walker +190 — opened even bigger (-300)",
    note: "A short-notice heavyweight main event. Walker is the bigger, more explosive striker, with spinning attacks and knees that can end it in one shot. Cortes-Acosta wants to wear him down with volume and pressure over five rounds. If Walker lands early, it's over fast; if it goes long, Cortes-Acosta's work rate takes over." },
  "tatianasuarez|virnajandiroba": { odds: "Suarez -204, Jandiroba +173",
    note: "Wrestler vs jiu-jitsu ace, between two former title contenders. Suarez will try to take Jandiroba down and keep her there; Jandiroba is happy to go to the mat because she's so dangerous with submissions from her back. If Suarez can control without getting caught, she wins clearly. If Jandiroba catches an arm or neck in a scramble, it's the upset." },
  "aljamainsterling|kevinvallejos": { odds: "Lines not posted at write-up time",
    note: "Wrestler vs knockout artist. Sterling, the former bantamweight champion, wants to take Vallejos down and wrap him up from the back. Vallejos throws a lot and hits hard, and he's said he'll knock Sterling out if Sterling tries to wrestle. If the young Argentine keeps it standing, he's dangerous; if Sterling gets his hands on him, it's a long night for Vallejos." },
  "asualmabayev|kyojihoriguchi": { odds: "Lines not posted at write-up time",
    note: "Speed vs grip. Horiguchi is a blur on the feet, darting in and out with karate-style blitzes. Almabayev is the bigger submission threat and wants to wrestle. Both are coming back from losses to Manel Kape, so the winner climbs right back into the flyweight title picture." },
  "brianortega|danhooker": { odds: "Lines not posted at write-up time",
    note: "Two fan favorites who badly need a win. Hooker is the taller man with a six-inch reach edge and will want to pick Ortega apart on the feet. Ortega is one of the best jiu-jitsu fighters in the division and can win from bad spots. Hooker has been stopped three straight times; Ortega hasn't fought in over a year. Classic striker vs grappler." },
  "ikramaliskerov|jaredcannonier": { odds: "Lines not posted at write-up time",
    note: "A rising contender against a former title challenger. Aliskerov is accurate and powerful on the feet and very hard to take down. Cannonier has real knockout power and a lot of experience, but he's lost four of his last five. This is the kind of fight a contender is supposed to win; Cannonier needs it to stay relevant." },
  "charlesoliveira|diegolopes": { odds: "Oliveira -155, Lopes +130",
    note: "For the BMF belt — not a division title, but a badge for the sport's most exciting fighters. Oliveira is a former lightweight champion and one of the greatest submission artists ever. Lopes is an aggressive featherweight contender who loves to scramble and throw. Neither man plays it safe, so expect action from the opening bell." },
  "alexpereira|sergeipavlovich": { odds: "Pavlovich -205, Pereira +170 — Pereira opened a slight underdog and the gap has grown",
    note: "Alex Pereira, former champion at middleweight and light heavyweight, tries the big boys against one of heavyweight's hardest punchers. Pavlovich is bigger and fires heavy overhands; Pereira's left hook has flattened champions. Whoever lands clean first probably wins." },
  "brandonmoreno|charlesjohnson": { odds: "Lines not posted at write-up time",
    note: "Former flyweight champion Brandon Moreno, back in the win column after a split decision in September, against Charles Johnson, a busy switch-stance striker. Moreno's experience and boxing are the edge, but he's lost two of his last three." },
  "bonickal|joepyfer": { odds: "Pyfer -198, Nickal +164",
    note: "Two rising middleweights with something to prove. Pyfer is coming off the biggest win of his career, stopping Israel Adesanya in March. Nickal is a decorated Penn State wrestler who has knocked out his last two opponents. If Nickal gets it to the mat, he's in charge; if Pyfer keeps it standing, his power is the difference." },
  "israeladesanya|sharamagomedov": { odds: "Adesanya -150, Magomedov +130 — Adesanya opened -205, but money has poured in on Magomedov",
    note: "A legend fighting for his career against a young knockout puncher. Adesanya is the taller man with a seven-inch reach edge and still has some of the best striking skills the division has seen — but he's lost four straight, the last by knockout. Magomedov has 12 knockouts in 17 wins and comes forward hunting the finish. If Adesanya can keep him at the end of his jab, the old master wins; if Magomedov drags him into a firefight, it could be a sad night." },
  "ianmachadogarry|yaroslavamosov": { odds: "Garry -145, Amosov +125 — Garry opened -185",
    note: "Slick striker vs suffocating wrestler. Garry is long, quick and likes to pick opponents apart from the outside. Amosov, the former Bellator champion, has lost once in 31 fights and wants to take Garry down and grind. If Garry keeps it standing, he's the favorite for a reason; if Amosov gets his hands on him early, this could get ugly for the Irishman." },
});

/* ============ EVENT META — which fights are the main card ============ */
EVENT_META.push(
  { match: ["cortes-acosta vs. walker", "cortes-acosta vs walker", "cortes acosta vs. walker", "acosta vs. walker", "bonfim vs. brady"], titles: "",
    note: "<b>Johnny Walker came from behind to stop Waldo Cortes-Acosta at 2:27 of round three</b> — down on two of the three scorecards, he hurt him and finished with punches. That's two straight wins since moving up to heavyweight, plus a $100,000 bonus. <b>Tatiana Suarez beat Virna Jandiroba by unanimous decision</b> (30-27, 30-27, 29-28), riding out her submission attempts to win from on top, then called for a title shot. Lucas Fernando out-pointed Billy Elekana, and on the prelims Andre Petroski stopped Mantas Kondratavicius in round two.",
    mainCard: ["johnnywalker|waldocortesacosta", "tatianasuarez|virnajandiroba"] },
  { match: ["adesanya vs. magomedov", "adesanya vs magomedov"], titles: "",
    note: "Dec 5 in Riyadh, Saudi Arabia — a daytime card for US fans on Paramount+. Former two-time middleweight champion Israel Adesanya, on a four-fight losing streak, faces hard-hitting Shara Magomedov (17-1). In the co-main, Ian Machado Garry — back after his title loss to Islam Makhachev — meets former Bellator welterweight champion Yaroslav Amosov. Serghei Spivac vs Mario Pinto is also on the main card.",
    mainCard: ["israeladesanya|sharamagomedov", "ianmachadogarry|yaroslavamosov"] },
  { match: ["ufc 334", "gane vs. hokit", "gane vs hokit"], titles: "2 title fights",
    note: "Madison Square Garden: new heavyweight champion Ciryl Gane's first defense against unbeaten wrestler Josh Hokit, and Kayla Harrison vs Amanda Nunes for the women's bantamweight belt — Nunes coming out of retirement. Also on the main card: Caio Borralho vs Yousri Belgaroui, Kevin Holland vs Uros Medic, and Bilal Hasan vs Luis Gurule. Stephen \"Wonderboy\" Thompson has his final fight on the prelims.",
    mainCard: ["cirylgane|joshhokit", "amandanunes|kaylaharrison", "caioborralho|yousribelgaroui", "kevinholland|urosmedic", "bilalhasan|luisgurule"] },
  { match: ["prochazka vs. stirling", "prochazka vs stirling", "procházka vs. stirling"], titles: "",
    note: "Nov 21 at ABHA Arena in Doha, Qatar — an early one for US fans (main card 1 p.m. ET on Paramount+). Former light heavyweight champion Jiří Procházka meets unbeaten Navajo Stirling over five rounds. Former bantamweight champ Aljamain Sterling vs Argentine knockout artist Kevin Vallejos is the co-main, with Kyoji Horiguchi vs Asu Almabayev, Dan Hooker vs Brian Ortega and Jared Cannonier vs Ikram Aliskerov also on the main card.",
    mainCard: ["jiriprochazka|navajostirling", "aljamainsterling|kevinvallejos", "asualmabayev|kyojihoriguchi", "brianortega|danhooker", "ikramaliskerov|jaredcannonier"] },
  { match: ["ufc 335", "oliveira vs. lopes", "oliveira vs lopes"], titles: "",
    note: "Dec 12 at T-Mobile Arena, Las Vegas — free on Paramount+, no pay-per-view. Charles Oliveira defends the BMF belt (a just-for-fun title for the sport's most exciting fighters) against Diego Lopes, and former two-division champ Alex Pereira takes on heavyweight slugger Sergei Pavlovich. Also on the main card: Brandon Moreno vs Charles Johnson and Joe Pyfer vs Bo Nickal. Full fighter breakdowns come in a later refresh.",
    mainCard: ["charlesoliveira|diegolopes", "alexpereira|sergeipavlovich", "brandonmoreno|charlesjohnson", "bonickal|joepyfer"] }
);

/* ============ FALLBACK SNAPSHOT (if live feed unreachable) ============ */
(function () {
  const F = (weight, n1, r1, n2, r2) => ({ weight, f1: { name: n1, record: r1, winner: false }, f2: { name: n2, record: r2, winner: false }, done: false, live: false });
  FALLBACK_EVENTS.push(
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
      F("Light Heavyweight", "Jiří Procházka", "32-6-1", "Navajo Stirling", "11-0-0"),
      F("Featherweight", "Aljamain Sterling", "", "Kevin Vallejos", "18-1-0"),
      F("Flyweight", "Kyoji Horiguchi", "36-6-0", "Asu Almabayev", "24-3-0"),
      F("Lightweight", "Dan Hooker", "", "Brian Ortega", "16-5-0"),
      F("Middleweight", "Ikram Aliskerov", "", "Jared Cannonier", "")
    ]},
    { name: "UFC Fight Night: Adesanya vs. Magomedov", date: "2026-12-05T18:00Z", venue: "Riyadh, Saudi Arabia", fights: [
      F("Middleweight", "Israel Adesanya", "24-6-0", "Shara Magomedov", "17-1-0"),
      F("Welterweight", "Ian Machado Garry", "", "Yaroslav Amosov", "30-1-0")
    ]},
    { name: "UFC 335: Oliveira vs. Lopes", date: "2026-12-13T02:00Z", venue: "T-Mobile Arena, Las Vegas", fights: [
      F("Lightweight", "Charles Oliveira", "", "Diego Lopes", ""),
      F("Heavyweight", "Alex Pereira", "", "Sergei Pavlovich", ""),
      F("Flyweight", "Brandon Moreno", "", "Charles Johnson", ""),
      F("Middleweight", "Joe Pyfer", "16-3-0", "Bo Nickal", "9-1-0")
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
  { em: "🥃", title: "Johnny Walker, heavyweight", body: [
    "Moving up has made <b>Johnny Walker</b> look like a new fighter. Five weeks after knocking out Mick Parkin with a knee in his heavyweight debut, he took a short-notice main event against ranked Waldo Cortes-Acosta, was losing on two of three cards, and <b>stopped him in round three</b>. Two fights, two finishes — and suddenly the 6-foot-6 Brazilian is a name at heavyweight.",
    "Next up in the division: <b>Ciryl Gane vs Josh Hokit for the belt at UFC 334</b> on Saturday, then <b>Alex Pereira vs Sergei Pavlovich at UFC 335</b> on Dec 12."] },
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
    "Drew Dober": "2951202", "Jim Miller": "2335718", "Terrance McKinney": "4425604",
    // Nov 8: Doha + UFC 335 main cards, each from their espn.com/mma/fighter/_/id profile URL
    "Kevin Vallejos": "5145681", "Kyoji Horiguchi": "2613374", "Asu Almabayev": "4294926", "Dan Hooker": "3109135",
    "Brian Ortega": "3045737", "Ikram Aliskerov": "4684776", "Jared Cannonier": "3154860",
    "Brandon Moreno": "3027545", "Charles Johnson": "4375156", "Joe Pyfer": "4684135", "Bo Nickal": "5061870",
    // Nov 12: Saudi card, from espn.com/mma/fighter/_/id profile URLs
    "Israel Adesanya": "4285679", "Shara Magomedov": "4421784", "Yaroslav Amosov": "4275020"
  };
  Object.keys(RAW).forEach(n => { ESPN_IDS[norm(n)] = RAW[n]; });
})();
