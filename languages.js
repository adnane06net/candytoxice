var TEXT_TIME_ATTACK = "Time\nAttack";
var TEXT_STORY_MODE = "Story%sMode";

//STORY MODE
var TEXT_GAMEOVER = "Game Over";
var TEXT_WIN = "Level complete!";
var TEXT_TIMEBONUS = "Time bonus: %s";
var TEXT_TOTAL = "Total: %s";
var TEXT_NEXT = "Next level";
var TEXT_CREDITS = "Credits";
var TEXT_ISPAUSED = "Pause";
var TEXT_STAGE = "Stage %s";

var TEXT_SELECT_LEVEL = "Select level";

var TEXT_SCORES = "Scores: %s";
var TEXT_SCORE = "Score\n%s";
var TEXT_TOTALSCORE = "Total Score\n%s";
var TEXT_TIME = "Time left:";

var TEXT_HELP1 =
  "Match 3 or more pieces\nin a row and reach the level's goal!\nHurry up!\nTime is limited!";
var TEXT_HELP3 = "The bomb will blow a bunch of pieces!";
var TEXT_HELP5 = "A new Pink jelly\nis now available\n\nGet them all!";
var TEXT_HELP8 =
  "The wood blocks\ndon’t allow you\nto reach your beloved\njellies...\n\nBreak them!";
var TEXT_HELP11 =
  "Your passion for jellies \ndeserves extra time! \n\nClick on the hourglass \nto get it!";
var TEXT_HELP13 =
  "You can’t have \nenough??? \n\nIt’s time to find \nall the Doggy Jelly!!!";
var TEXT_HELP15 =
  "Touch it when it \nturns into your \nfavorite jelly pieces \nto get them all!";
var TEXT_HELP17 =
  "You got a special \nunique candy! \n\nLet it fall down \nmatching all the \njelly around it!";
var TEXT_HELP19 =
  "Wait, wait, wait! \nYou are collecting too \nmany jellies! \nFrom this moment on, \nyou can’t touch all \nthe caged ones!!!";
var TEXT_HELP22 = "Last but not least… \nChicky Jelly! \n\nCatch them all!";

var TEXT_CONGRATULATIONS = "CONGRATULATIONS!";
var TEXT_END_2 = "You collected all the Jellies!\nYou are a legend!!!";
var TEXT_END_4 = "If you want to improve your score,\nreplay some levels!";

//TIME ATTACK
var TEXT_HELP =
  "Match 3 or more identical jellies to make them explode before time runs out!";
var TEXT_HELP2 =
  "If you match 4 or more identical jellies you'll get extra time!";
var TEXT_HELP_ITEM = "Bonus items";
var TEXT_HELP_BOMB = "Match 4 identical jellies in a row to get a bomb";
var TEXT_HELP_CLOCK = "If you are lucky, you'll gain extra time";
var TEXT_HELP_CHANGING =
  "Match 5 identical jellies in a row to get a jolly that will destroy all identical jellies and will give you extra time";
var TEXT_BEST_SCORE = "Best Score\n%s";
var TEXT_TIME_IS_UP = "Time is Up!";

var TEXT_SHUFFLE = "No more matches available...";

var TEXT_GAMERESTART = "Restart game";
var TEXT_WARNING = "This will clear all\nyour past achievements";
var TEXT_SURE = "Are You Sure?";

var TEXT_VIDEO_REWARD = "Watch an AD Video to get extra time";

var TEXT_ERR_LS =
  "YOUR WEB BROWSER DOES NOT SUPPORT LOCAL STORAGE. IF YOU'RE USING SAFARI, IT MAY BE RELATED TO PRIVATE BROWSING. AS A RESULT, SOME INFO MAY NOT BE SAVED OR SOME FEATURES MAY NOT BE AVAILABLE.";

var TEXT_SHARE_IMAGE = "200x200.jpg";
var TEXT_SHARE_TITLE = "Congratulations!";
var TEXT_SHARE_MSG1 = "You collected <strong>";
var TEXT_SHARE_MSG2 =
  " points</strong>!<br><br>Share your score with your friends!";
var TEXT_SHARE_SHARE1 = "My score is ";
var TEXT_SHARE_SHARE2 = " points! Can you do better";

function refreshLanguage() {
  switch (s_iCurLang) {
    case LANG_EN: {
      //ENGLISH
      TEXT_TIME_ATTACK = "Time\nAttack";
      TEXT_STORY_MODE = "Story%sMode";

      //STORY MODE
      TEXT_GAMEOVER = "Game Over";
      TEXT_WIN = "Level complete!";
      TEXT_TIMEBONUS = "Time bonus: %s";
      TEXT_TOTAL = "Total: %s";
      TEXT_NEXT = "Next level";
      TEXT_CREDITS = "Credits";
      TEXT_ISPAUSED = "Pause";
      TEXT_STAGE = "Stage %s";

      TEXT_SELECT_LEVEL = "Select level";

      TEXT_SCORES = "Scores: %s";
      TEXT_SCORE = "Score\n%s";
      TEXT_TOTALSCORE = "Total Score\n%s";
      TEXT_TIME = "Time left:";

      TEXT_HELP1 = "Match 3 or more pieces\nin a row and reach the level's goal!\nHurry up!\nTime is limited!";
      TEXT_HELP3 = "The bomb will blow a bunch of pieces!";
      TEXT_HELP5 = "A new Pink jelly\nis now available\n\nGet them all!";
      TEXT_HELP8 = "The wood blocks\ndon’t allow you\nto reach your beloved\njellies...\n\nBreak them!";
      TEXT_HELP11 = "Your passion for jellies \ndeserves extra time! \n\nClick on the hourglass \nto get it!";
      TEXT_HELP13 = "You can’t have \nenough??? \n\nIt’s time to find \nall the Doggy Jelly!!!";
      TEXT_HELP15 = "Touch it when it \nturns into your \nfavorite jelly pieces \nto get them all!";
      TEXT_HELP17 = "You got a special \nunique candy! \n\nLet it fall down \nmatching all the \njelly around it!";
      TEXT_HELP19 = "Wait, wait, wait! \nYou are collecting too \nmany jellies! \nFrom this moment on, \nyou can’t touch all \nthe caged ones!!!";
      TEXT_HELP22 = "Last but not least… \nChicky Jelly! \n\nCatch them all!";

      TEXT_CONGRATULATIONS = "CONGRATULATIONS!";
      TEXT_END_2 = "You collected all the Jellies!\nYou are a legend!!!";
      TEXT_END_4 = "If you want to improve your score,\nreplay some levels!";

      //TIME ATTACK
      TEXT_HELP = "Match 3 or more identical jellies to make them explode before time runs out!";
      TEXT_HELP2 = "If you match 4 or more identical jellies you'll get extra time!";
      TEXT_HELP_ITEM = "Bonus items";
      TEXT_HELP_BOMB = "Match 4 identical jellies in a row to get a bomb";
      TEXT_HELP_CLOCK = "If you are lucky, you'll gain extra time";
      TEXT_HELP_CHANGING = "Match 5 identical jellies in a row to get a jolly that will destroy all identical jellies and will give you extra time";
      TEXT_BEST_SCORE = "Best Score\n%s";
      TEXT_TIME_IS_UP = "Time is Up!";

      TEXT_SHUFFLE = "No more matches available...";

      TEXT_GAMERESTART = "Restart game";
      TEXT_WARNING = "This will clear all\nyour past achievements";
      TEXT_SURE = "Are You Sure?";

      TEXT_VIDEO_REWARD = "Watch an AD Video to get extra time";

      TEXT_ERR_LS = "YOUR WEB BROWSER DOES NOT SUPPORT LOCAL STORAGE. IF YOU'RE USING SAFARI, IT MAY BE RELATED TO PRIVATE BROWSING. AS A RESULT, SOME INFO MAY NOT BE SAVED OR SOME FEATURES MAY NOT BE AVAILABLE.";

      break;
    }
    case LANG_ES: {
      //SPANISH
      TEXT_TIME_ATTACK = "Contra-\nrreloj";
      TEXT_STORY_MODE = "Modo%sHistoria";

      //STORY MODE
      TEXT_GAMEOVER = "Fin de partida";
      TEXT_WIN = "Nivel completado!";
      TEXT_TIMEBONUS = "Bonificación de tiempo: %s";
      TEXT_TOTAL = "Total: %s";
      TEXT_NEXT = "Siguiente nivel";
      TEXT_CREDITS = "Créditos";
      TEXT_ISPAUSED = "Pausa";
      TEXT_STAGE = "Escenario %s";

      TEXT_SELECT_LEVEL = "Elige nivel";

      TEXT_SCORES = "Marcador: %s";
      TEXT_SCORE = "Marcador: %s";
      TEXT_TOTALSCORE = "Total Marcador\n%s";
      TEXT_TIME = "Tiempo restante:";

      TEXT_HELP1 =
        "¡Une 3 o más piezas\nseguidas y alcanza el objetivo de cada nivel!\n¡Date prisa!\n¡El tiempo es limitado!";
      TEXT_HELP3 = "¡La bomba hará estallar un montón de piezas!";
      TEXT_HELP5 =
        "Hay disponible\nuna nueva gelatina rosa\n\n¡Hazte con todas!";
      TEXT_HELP8 =
        "Si los bloques de madera\nno te permiten\nllegar hasta tus queridas\ngelatinas...\n\n¡Destrózalos!";
      TEXT_HELP11 =
        "¡Tu pasión por las gelatinas \nmerece un tiempo extra! \n\n¡Haz clic en el reloj de arena \npara conseguirlo!";
      TEXT_HELP13 =
        "¿¿¿No tienes \nsuficiente??? \n\n¡¡¡Es hora de encontrar \ntoda la gelatina perruna!!!";
      TEXT_HELP15 =
        "¡Toca cuando \nse convierta en tu \ntrozo de gelatina favorito \npara hacerte con todos!";
      TEXT_HELP17 =
        "¡Tienes una golosina \núnica y especial! \n\n¡Déjala caer \nuniendo así toda la \ngelatina a su alrededor!";
      TEXT_HELP19 =
        "¡Esper, espera, espera! \n¡Estás recogiendo demasiadas \ngelatinas! \n¡¡¡Desde este mismo momento, \nno podrás tocar las \nque están enjauladas!!!";
      TEXT_HELP22 =
        "Por último pero no menos importante… \n¡Gelatina de pollos! \n\n¡Hazte con todas!";

      TEXT_CONGRATULATIONS = "¡ENHORABUENA!";
      TEXT_END_2 =
        "¡Te has hecho con todas las gelatinas!\n¡¡¡Eres toda una leyenda!!!";
      TEXT_END_4 =
        "Si quieres mejorar tu puntuación,\n¡vuelve a jugar algunos niveles!";

      //TIME ATTACK
      TEXT_HELP =
        "¡Une 3 o más gelatinas idénticas para hacer que exploten antes de que se acabe el tiempo!";
      TEXT_HELP2 =
        "¡Si logras juntar 4 o más gelatinas idénticas conseguirás tiempo extra!";
      TEXT_HELP_ITEM = "Objetos de bonificación";
      TEXT_HELP_BOMB =
        "Une 4 gelatinas idénticas seguidas para conseguir una bomba";
      TEXT_HELP_CLOCK = "Si tienes suerte, conseguirás algo de tiempo extra";
      TEXT_HELP_CHANGING =
        "Une 5 gelatinas idénticas seguidas para conseguir una bonificación que destrozará todas las gelatinas idénticas y te dará tiempo extra.";
      TEXT_BEST_SCORE = "Récord\n%s";
      TEXT_TIME_IS_UP = "¡Se acabó el tiempo!";

      TEXT_SHUFFLE = "No hay más combinaciones disponibles...";

      TEXT_GAMERESTART = "Reiniciar la partida";
      TEXT_WARNING = "Esto despejará todos\ntus logros anteriores";
      TEXT_SURE = "¿Seguro?";

      TEXT_VIDEO_REWARD = "Ve un vídeo de anuncio para conseguir tiempo extra";

      TEXT_ERR_LS =
        "TU NAVEGADOR NO ES COMPATIBLE CON EL ALMACENAMIENTO LOCAL. SI USAS SAFARI, PODRÍA ESTAR OCASIONADO POR LA NAVEGACIÓN PRIVADA. COMO RESULTADO, ALGUNA INFORMACIÓN PODRÍA NO GUARDARSE Y ALGUNAS FUNCIONES PUEDEN NO ESTAR DISPONIBLES.";

      break;
    }
    case LANG_FR: {
      //FRENCH
      TEXT_TIME_ATTACK = "Défi\nChrono";
      TEXT_STORY_MODE = "Mode%sHistoire";

      //STORY MODE
      TEXT_GAMEOVER = "Fin de la partie";
      TEXT_WIN = "Niveau terminé";
      TEXT_TIMEBONUS = "Bonus de temps: %s";
      TEXT_TOTAL = "Total: %s";
      TEXT_NEXT = "Niveau suivant";
      TEXT_CREDITS = "Crédits";
      TEXT_ISPAUSED = "Pause";
      TEXT_STAGE = "Niveau %s";

      TEXT_SELECT_LEVEL = "Choix du niveau";

      TEXT_SCORES = "Score: %s";
      TEXT_SCORE = "Score\n%s";
      TEXT_TOTALSCORE = "Total Score\n%s";
      TEXT_TIME = "Temps restant :";

      TEXT_HELP1 =
        "Associez au moins 3 Jellies\npour atteindre l’objectif !\nFaites vite !\nLe temps est limité !";
      TEXT_HELP3 = "La bombe va faire exploser plusieurs Jellies !";
      TEXT_HELP5 =
        "Une nouvelle Jelly rose\nest disponible\n\nFaites-les toutes disparaître !";
      TEXT_HELP8 =
        "Le bois vous\nempêche d’atteindre\nvos Jellies\n adorées...\n\nCassez-le !";
      TEXT_HELP11 =
        "Votre passion pour les Jellies\nmérite une récompense !\n\nCliquez sur le sablier\npour obtenir du temps bonus !";
      TEXT_HELP13 =
        "Il vous en faut\ntoujours plus ?\n\nJetez-vous donc\nsur les Jellies toutous !";
      TEXT_HELP15 =
        "Touchez cette Jelly\nlorsqu’elle prend\nla forme de votre choix\npour toutes les récupérer !";
      TEXT_HELP17 =
        "Voici une friandise\nabsolument unique !\n\nFaites-la tomber tout\nen bas en éliminant\nles Jellies qui l’entourent !";
      TEXT_HELP19 =
        "Un petit instant !\nVous avez récupéré\nbien trop de Jellies !\nDésormais,\ncelles en cage\nsont protégées !";
      TEXT_HELP22 =
        "Et pour finir… \nla Jelly poussin !\n\nRécupérez-les toutes !";

      TEXT_CONGRATULATIONS = "FÉLICITATIONS !";
      TEXT_END_2 =
        "Vous avez récupéré toutes les Jellies !\nVous êtes une vraie légende !";
      TEXT_END_4 = "Pour améliorer votre score,\nrejouez certains niveaux !";

      //TIME ATTACK
      TEXT_HELP =
        "Associez au moins 3 Jellies identiques pour les faire exploser avant la fin du temps imparti !";
      TEXT_HELP2 =
        "Si vous associez au moins 4 Jellies identiques, vous gagnez du temps bonus !";
      TEXT_HELP_ITEM = "Objets bonus";
      TEXT_HELP_BOMB = "Associez 4 Jellies identiques pour obtenir une bombe";
      TEXT_HELP_CLOCK = "Avec un peu de chance, vous obtiendrez du temps bonus";
      TEXT_HELP_CHANGING =
        "Associez 5 Jellies identiques pour obtenir une Jolly, qui détruira toutes les Jellies à son image et vous donnera du temps bonus";
      TEXT_BEST_SCORE = "Record\n%s";
      TEXT_TIME_IS_UP = "Temps écoulé !";

      TEXT_SHUFFLE = "Plus aucun coup possible...";

      TEXT_GAMERESTART = "Relancer le jeu";
      TEXT_WARNING = "Ceci effacera\ntoute votre progression";
      TEXT_SURE = "Continuer ?";

      TEXT_VIDEO_REWARD =
        "Regardez une publicité pour obtenir du temps supplémentaire";

      TEXT_ERR_LS =
        "VOTRE NAVIGATEUR N’AUTORISE PAS LE STOCKAGE WEB LOCAL. SUR SAFARI, CELA PEUT ÊTRE DÛ À L’UTILISATION DU MODE DE NAVIGATION PRIVÉE. CERTAINES INFORMATIONS PEUVENT DONC NE PAS ÊTRE SAUVEGARDÉES OU CERTAINES FONCTIONNALITÉS RISQUENT D’ÊTRE INDISPONIBLES.";

      break;
    }
    case LANG_DE: {
      //GERMAN
      TEXT_TIME_ATTACK = "Zeit-\nAngriff";
      TEXT_STORY_MODE = "Story-%sModus";

      //STORY MODE
      TEXT_GAMEOVER = "Game Over";
      TEXT_WIN = "Level abgeschlossen";
      TEXT_TIMEBONUS = "Zeitbonus: %s";
      TEXT_TOTAL = "Gesamt: %s";
      TEXT_NEXT = "Nächstes Level";
      TEXT_CREDITS = "Credits";
      TEXT_ISPAUSED = "Pause";
      TEXT_STAGE = "Stufe %s";

      TEXT_SELECT_LEVEL = "Wähle einen Level";

      TEXT_SCORES = "Punktzahlen: %s";
      TEXT_SCORE = "Punktzahlen\n%s";
      TEXT_TOTALSCORE = "Gesamtpunktzahl\n%s";
      TEXT_TIME = "Verbleibende Zeit:";

      TEXT_HELP1 =
        "Ordne 3 oder mehr\nin einer Reihe an und erreiche das Ziel des Levels!\nBeeil dich!\nDie Zeit ist begrenzt!";
      TEXT_HELP3 = "Die Bombe wird einen Haufen von ihnen in die Luft jagen!";
      TEXT_HELP5 =
        "Ein neues Pink Jelly\nist jetzt verfügbar\n\nHol sie dir alle!";
      TEXT_HELP8 =
        "Die Holzblöcke\nhindern dich daran,\ndeine geliebten Jellys\nzu erreichen ...\n\nZerstöre sie!";
      TEXT_HELP11 =
        "Deine Leidenschaft für Jellys \nbenötigt zusätzliche Zeit! \n\nKlick auf die Sanduhr, \nnur so bekommst du sie!";
      TEXT_HELP13 =
        "Du bekommst \nnicht genug??? \n\nEs ist an der Zeit, \nalle Doggy Jellys zu finden!!!";
      TEXT_HELP15 =
        "Berühre es, \nwenn es sich in dein \nLieblings-Jelly verwandelt, \nso bekommst du sie alle!";
      TEXT_HELP17 =
        "Du hast ein besonderes \neinzigartiges Bonbon! \n\nLass es herunterfallen \nund ordne es mit den \nJellys daneben an!";
      TEXT_HELP19 =
        "Warte, warte, warte! \nDu sammelst zu \nviele Jellys! \nAb jetzt kommst \ndu nicht mehr \nan all die eingesperrten ran!!!";
      TEXT_HELP22 = "Zu guter Letzt … \nChicky-Jelly! \n\nHol sie dir alle!";

      TEXT_CONGRATULATIONS = "GLÜCKWUNSCH!";
      TEXT_END_2 = "Du hast alle Jellys gesammelt!\nDu bist eine Legende!!!";
      TEXT_END_4 =
        "Wenn du deine Punktzahl verbessern willst,\ndann spiele einige Levels noch einmal!";

      //TIME ATTACK
      TEXT_HELP =
        "Ordne 3 oder mehr gleiche Jellys zusammen an, um sie explodieren zu lassen, bevor die Zeit abläuft!";
      TEXT_HELP2 =
        "Wenn du 4 oder mehr gleiche Jellys zusammen anordnest, bekommst du zusätzliche Zeit!";
      TEXT_HELP_ITEM = "Bonus-Items";
      TEXT_HELP_BOMB =
        "Ordne 4 gleiche Jellys in einer Reihe an, um eine Bombe zu erhalten";
      TEXT_HELP_CLOCK = "Wenn du Glück hast, bekommst du zusätzliche Zeit";
      TEXT_HELP_CHANGING =
        "Wenn du 5 gleiche Jellys in einer Reihe anordnest, bekommst du einen Jolly, der alle gleichen Jellys zerstört und dir zusätzliche Zeit verschafft";
      TEXT_BEST_SCORE = "Beste Punktzahl\n%s";
      TEXT_TIME_IS_UP = "Die Zeit ist abgelaufen!";

      TEXT_SHUFFLE = "Keine weiteren Matches verfügbar ...";

      TEXT_GAMERESTART = "Starte das Spiel neu";
      TEXT_WARNING = "Dadurch werden alle\ndeine bisherigen Erfolge gelöscht";
      TEXT_SURE = "Bist du dir sicher?";

      TEXT_VIDEO_REWARD = "Schau dir eine Werbung an, um mehr Zeit zu bekommen";

      TEXT_ERR_LS =
        "DEIN WEBBROWSER UNTERSTÜTZT LOKALES SPEICHERN NICHT. WENN DU SAFARI NUTZT, KÖNNTE ES AN DER FUNKTION PRIVATES SURFEN LIEGEN, DASS MANCHE INFOS NICHT GESPEICHERT WERDEN KÖNNEN UND MANCHE FEATURES NICHT ZUR VERFÜGUNG STEHEN.";
      break;
    }
    case LANG_PT: {
      //PORTUGUESE
      TEXT_TIME_ATTACK = "Ataque\nTemporizado";
      TEXT_STORY_MODE = "Modo%sde História";

      //STORY MODE
      TEXT_GAMEOVER = "Fim de jogo";
      TEXT_WIN = "Nível Completo";
      TEXT_TIMEBONUS = "Bónus de Tempo: %s";
      TEXT_TOTAL = "Total: %s";
      TEXT_NEXT = "Próximo Nível";
      TEXT_CREDITS = "Créditos";
      TEXT_ISPAUSED = "Pausa";
      TEXT_STAGE = "Nível %s";

      TEXT_SELECT_LEVEL = "Seleciona um nível";

      TEXT_SCORES = "Pontuação: %s";
      TEXT_SCORE = "Pontuação\n%s";
      TEXT_TOTALSCORE = "Pontuação Total\n%s";
      TEXT_TIME = "Tempo:";

      TEXT_HELP1 =
        "Combina 3 ou mais peças\nem linha para atingir o objetivo!\nRápido!\nO tempo é limitado!";
      TEXT_HELP3 = "A bomba vai rebentar com algumas peças!";
      TEXT_HELP5 =
        "Uma nova gelatina Rosa\nestá disponível\n\nApanha-as todas!";
      TEXT_HELP8 =
        "Os blocos de madeira\nnão te deixam\nchegar às tuas preciosas\ngelatinas...\n\nAcaba com eles!";
      TEXT_HELP11 =
        "A tua paixão por gelatinas \nmerece mais tempo! \n\nToca na ampulheta \npara ganhar mais tempo!";
      TEXT_HELP13 =
        "Não tens tempo \nsuficiente??? \n\nEstá na hora de achar \ntodas as Gelatinas de Cãezinhos!!!";
      TEXT_HELP15 =
        "Toca na gelatina quando \nse transforma na tua \npeça de Gelatina favorita \npara as receberes todas!";
      TEXT_HELP17 =
        "Recebeste um \ndoce único! \n\nDeixa-o cair para \ncombinar com todas as \ngelatinas à volta!";
      TEXT_HELP19 =
        "Espera lá! \nEstás a recolher \ndemasiadas gelatinas! \nA partir de agora, \nnão podes tocar em todas \nas que estejam presas!!!";
      TEXT_HELP22 = "Por último... \nGelatina de Piu-piu! \n\nApanha-as todas!";

      TEXT_CONGRATULATIONS = "PARABÉNS!";
      TEXT_END_2 = "Recolheste todas as Gelatinas!\nÉs uma lenda!!!";
      TEXT_END_4 =
        "Se queres melhorar a tua pontuação,\njoga certos níveis novamente!";

      //TIME ATTACK
      TEXT_HELP =
        "Combina 3 ou mais gelatinas iguais para as fazer explodir antes do tempo acabar!";
      TEXT_HELP2 =
        "Se combinares 4 ou mais gelatinas iguais, ganhas mais tempo!";
      TEXT_HELP_ITEM = "Itens Bónus";
      TEXT_HELP_BOMB =
        "Combina 4 gelatinas iguais em linha para ganhares uma bomba";
      TEXT_HELP_CLOCK = "Se tiveres sorte, ganhas tempo extra";
      TEXT_HELP_CHANGING =
        "Combina 5 gelatinas iguais em linha para ganhares uma peça que rebenta com todas as gelatinas iguais e dá tempo extra";
      TEXT_BEST_SCORE = "Melhor Pontuação\n%s";
      TEXT_TIME_IS_UP = "Acabou o Tempo!";

      TEXT_SHUFFLE = "Não há mais níveis disponíveis...";

      TEXT_GAMERESTART = "Recomeçar o jogo";
      TEXT_WARNING = "Vais apagar\ntodas as proezas anteriores";
      TEXT_SURE = "Tens a certeza?";

      TEXT_VIDEO_REWARD =
        "Vê um vídeo de publicidade para ganhares tempo extra";

      TEXT_ERR_LS =
        "SEU NAVEGADOR DA WEB NÃO É COMPATÍVEL COM ARMAZENAMENTO LOCAL. SE ESTIVER USANDO O SAFARI, ISSO PODE ESTAR RELACIONADO À NAVEGAÇÃO PRIVADA. COMO RESULTADO, ALGUMAS INFORMAÇÕES PODEM NÃO SER SALVAS, OU ALGUNS RECURSOS TALVEZ NÃO ESTEJAM DISPONÍVEIS.";
      break;
    }
    case LANG_IT: {
      //ITALIAN
      TEXT_TIME_ATTACK = "Modalità Arcade";
      TEXT_STORY_MODE = "Modalità%sStoria";

      //STORY MODE
      TEXT_GAMEOVER = "Game Over";
      TEXT_WIN = "Livello Completato!";
      TEXT_TIMEBONUS = "Bonus Tempo: %s";
      TEXT_TOTAL = "Totale: %s";
      TEXT_NEXT = "Prossimo livello";
      TEXT_CREDITS = "Credits";
      TEXT_ISPAUSED = "Gioco in Pausa";
      TEXT_STAGE = "Livello %s";

      TEXT_SELECT_LEVEL = "Seleziona un livello";

      TEXT_SCORES = "Punteggio: %s";
      TEXT_SCORE = "Punteggio\n%s";
      TEXT_TOTALSCORE = "Punteggio Totale\n%s";
      TEXT_TIME = "Tempo rimasto:";

      TEXT_HELP1 =
        "Combina 3 o più\npezzi di fila\nFai presto!\nIl tempo scorre!";
      TEXT_HELP3 = "La Bomba distruggerà\nun sacco di pezzi!";
      TEXT_HELP5 = "Una nuova Gelatina rosa\nè apparsa!\n\nPrendile tutte!";
      TEXT_HELP8 =
        "I blocch di legno non ti\npermettono di prendere le\ntue amate gelatine...\n\nDistruggili!";
      TEXT_HELP11 =
        "La tua passione per le gelatine\nmerita più tempo!\n\nPremi sulla clessidra\nper ottenere tempo extra";
      TEXT_HELP13 =
        "Non ne hai abbastanza???\n\nÈ giunta l'ora di trovare\ntutte le Gelatine Cagnolino";
      TEXT_HELP15 =
        "Premilo quando compare\nla tua gelatina preferita\nper prenderle tutte";
      TEXT_HELP17 =
        "Hai trovato una Gelatina Speciale\n\nFalla cadere in basso combinando\ntutte le gelatine intorno";
      TEXT_HELP19 =
        "Aspetta, aspetta, aspetta!\nStai collezionando troppe gelatine!\n\nDa questo momento non puoi\nraccogliere le gelatine in gabbia!";
      TEXT_HELP22 =
        "Ultimo ma non per importanza...\nLa gelatina Pulcino!\n\nPrendile tutte";

      TEXT_CONGRATULATIONS = "CONGRATULAZIONI!";
      TEXT_END_2 = "Hai preso tutte le gelatine\nSei una leggenda!!!";
      TEXT_END_4 =
        "Se vuoi migliorare i tuoi punteggi,\nrigioca alcuni livelli!";

      //TIME ATTACK
      TEXT_HELP =
        "Combina 3 o più gelatine identiche per prenderle prima che il tempo scada";
      TEXT_HELP2 = "Se combini 4 o più gelatine identiche avrai tempo extra!";
      TEXT_HELP_ITEM = "Bonus";
      TEXT_HELP_BOMB = "Combina 4 gelatine identiche per ottenere una bomba";
      TEXT_HELP_CLOCK = "Se sei fortunato, guadagnerai tempo extra";
      TEXT_HELP_CHANGING =
        "Combina 5 gelatine identiche per ottenere un jolly che farà esplodere tutte le gelatine identiche e otterrai tempo extra per ogni gelatina catturata";
      TEXT_BEST_SCORE = "Miglior Punteggio\n%s";
      TEXT_TIME_IS_UP = "Tempo Scaduto!";

      TEXT_SHUFFLE = "Nessuna combinazione possibile...";

      TEXT_GAMERESTART = "Resetta il Gioco";
      TEXT_WARNING = "Questo cancellerà tutti\ni tuoi precedenti risultati";
      TEXT_SURE = "Sei Sicuro?";

      TEXT_VIDEO_REWARD = "Guarda un Video AD per ottenere tempo extra";

      TEXT_ERR_LS =
        "IL TUO WEB BROWSER NON SUPPORTA IL SALVATAGGIO IN LOCALE. SE STAI USANDO SAFARI, QUESTO PUO' ESSERE COLLEGATO ALLA NAVIGAZIONE IN INCOGNITO. DI CONSEGUENZA, QUALCHE INFO PUO' NON ESSERE SALVATA O QUALCHE FUNZIONALITA' PUO' NON ESSERE DISPONIBILE.";
      break;
    }
    case LANG_RU: {
      //RUSSIAN
      TEXT_TIME_ATTACK = "На время";
      TEXT_STORY_MODE = "Сюжет";

      //STORY MODE
      TEXT_GAMEOVER = "Итоговый Счет";
      TEXT_WIN = "Уровень пройден";
      TEXT_TIMEBONUS = "Бонус за время: %s";
      TEXT_TOTAL = "Всего: %s";
      TEXT_NEXT = "Следующий уровень";
      TEXT_CREDITS = "Титры";
      TEXT_ISPAUSED = "Пауза";
      TEXT_STAGE = "Этап %s";

      TEXT_SELECT_LEVEL = "Выберите уровень";

      TEXT_SCORES = "Счет: %s";
      TEXT_SCORE = "Счет\n%s";
      TEXT_TOTALSCORE = "Общий счет\n%s";
      TEXT_TIME = "Время:";

      TEXT_HELP1 =
        "Объедините 3 или более\nодинаковых фигурки и выполните задание!\nТоропитесь!\nВремя ограничено!";
      TEXT_HELP3 = "Бомба разнесет вдребезги все вокруг!";
      TEXT_HELP5 = "Появились\nновые розовые мармеладки\n\nСоберите их все!";
      TEXT_HELP8 =
        "Деревянные блоки\nмешают добраться\nдо любимого\n лакомства...\n\nСломайте их!";
      TEXT_HELP11 =
        "Такой вкуснятиной \nнужно наслаждаться не спеша! \n\nПесочные часы \nдадут больше времени!";
      TEXT_HELP13 = "Вам все еще \nмало?! \n\nНайдите всех \nмармелаек!";
      TEXT_HELP15 =
        "Когда эта мармеладка \nстанет нужной вам \nкоснитесь ее \nи соберите их все!";
      TEXT_HELP17 =
        "А вот и новая \nуникальная конфета! \n\nОпустите ее в самый низ, \nсовмещая мармеладки \nпод ней!";
      TEXT_HELP19 =
        "Стойте, стойте! \nЭто уже перебор! \nХватит! \nТеперь вы не можете \nприкасаться к мармеладкам \nв клетках!";
      TEXT_HELP22 = "Напоследок самое вкусное... \nМармецыпы! \n\nНалетайте!";

      TEXT_CONGRATULATIONS = "ПОЗДРАВЛЯЕМ!";
      TEXT_END_2 = "Вы собрали все мармеладки!\nВы лучше всех!!!";
      TEXT_END_4 = "Хотите улучшить счет?\nПереиграйте пройденные уровни!";

      //TIME ATTACK
      TEXT_HELP =
        "Объединяйте одинаковые мармеладки по 3 или более, чтобы убрать их, пока не истекло время!";
      TEXT_HELP2 =
        "Объединив 4 или более мармеладок, вы получите дополнительное время!";
      TEXT_HELP_ITEM = "Бонусные предметы";
      TEXT_HELP_BOMB =
        "Объедините 4 одинаковых мармеладки, чтобы получить бомбу";
      TEXT_HELP_CLOCK = "Если повезет, получите дополнительное время";
      TEXT_HELP_CHANGING =
        "Объедините 5 одинаковых мармеладок и получите мультиладку, которая уберет все одинаковые мармеладки и добавит времени";
      TEXT_BEST_SCORE = "Лучший счет\n%s";
      TEXT_TIME_IS_UP = "Время вышло!";

      TEXT_SHUFFLE = "Доступных ходов больше нет...";

      TEXT_GAMERESTART = "Начать заново";
      TEXT_WARNING = "Все ваши достижения\nбудут удалены";
      TEXT_SURE = "Вы уверены?";

      TEXT_VIDEO_REWARD =
        "Посмотрите рекламу, чтобы получить дополнительное время.";

      TEXT_ERR_LS =
        "ВАШ БРАУЗЕР НЕ ПОДДЕРЖИВАЕТ ЛОКАЛЬНОЕ ХРАНЕНИЕ НАСТРОЕК. В СЛУЧАЕ БРАУЗЕРА SAFARI САМАЯ ЧАСТАЯ ПРИЧИНА — ИСПОЛЬЗОВАНИЕ РЕЖИМА «ЧАСТНЫЙ ДОСТУП». ДАННЫЕ МОГУТ НЕ СОХРАНЯТЬСЯ ИЛИ НЕКОТОРЫЕ ФУНКЦИИ МОГУТ РАБОТАТЬ НЕКОРРЕКТНО.";
      break;
    }
  }
}
