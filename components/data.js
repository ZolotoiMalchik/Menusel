(function(G) {
let dataList = [
  {
   title: "Бэтман",
   name: "batman",
   level: 1,
   parent: null,
   data: [{
     title: "Так себе герой",
     name: "niochem",
     level: 2,
     parent: "batman",
     data: []
   },
   {
     title: "Крутой парень",
     name: "coolman",
     level: 2,
     parent: "batman",
     data: []
   },
   {
     title: "Немного унылый, но полезный",
     name: "middle",
     level: 2,
     parent: "batman",
     data: []
   }]
  },
  {
   title: "Супермэн",
   name: "supreman",
   level: 1,
   parent: null,
   data: [{
     title: "Классный парень с другой планеты",
     name: "coolalien",
     level: 2,
     parent: "supreman",
     data: []
   },{
     title: "Хочу такой же прекид",
     name: "dressme",
     level: 2,
     parent: "supreman",
     data: []
   },{
     title: "Бэтман лучше",
     name: "lessbatman",
     level: 2,
     parent: "supreman",
     data: []
   }]
  },
  {
   title: "Аквамэн",
   name: "aquaman",
   level: 1,
   parent: null,
   data: [{
     title: "Кто это?",
     name: "whois",
     level: 2,
     parent: "aquaman",
     data: []
   },{
     title: "Я его в игре престолов видел!",
     name: "gameofthrone",
     level: 2,
     parent: "aquaman",
     data: []
   },{
     title: "Классный русал! Пусть будет.",
     name: "marimade",
     level: 2,
     parent: "aquaman",
     data: []
   }]
  },
  {
   title: "Супер женщина",
   name: "suprewoman",
   level: 1,
   parent: null,
   data: [{
     title: "Супер!",
     name: "super1",
     level: 2,
     parent: "suprewoman",
     data: [{
       title: "Без вариантов",
       name: "super4",
       level: 3,
       parent: "super1",
       data: []
     }]
   },{
     title: "Супер!",
     name: "super2",
     level: 2,
     parent: "suprewoman",
     data: [{
       title: "Даже думать не о чем!",
       name: "super5",
       level: 3,
       parent: "super2",
       data: []
     }]
   },{
     title: "Супер!",
     name: "super3",
     level: 2,
     parent: "suprewoman",
     data: [{
       title: "Да ну ее!",
       name: "super6",
       level: 3,
       parent: "super3",
       data: [{
         title: "Ладно. Просто богиня.",
         name: "super7",
         level: 4,
         parent: "super6",
         data: []
       }]
     }]
   }]
  },
  {
   title: "Зеленый фонарь",
   name: "greenman",
   level: 1,
   parent: null,
   data: [{
     title: "Милый парень",
     name: "otherfilm",
     level: 2,
     parent: "greenman",
     data: []
   },
   {
     title: "В Дэдпулле круче",
     name: "deadpull",
     level: 2,
     parent: "greenman",
     data: []
   }]
  }
];

G.dataList = dataList;
})(window);