const app = Vue.createApp({
 data() {
  return {
   key1pressed: false,
   key2pressed: false,
   key3pressed: false,
   key4pressed: false,
   key5pressed: false,
   key6pressed: false,
   key7pressed: false,
   key8pressed: false,

   light1key: 0,
   light2key: 0,
   light3key: 0,
   light4key: 0,
   light5key: 0,
   light6key: 0,
   light7key: 0,
   light8key: 0,

   light1active: false,
   light2active: false,
   light3active: false,
   light4active: false,
   light5active: false,
   light6active: false,
   light7active: false,
   light8active: false,

   counterLights: 0,
   lastLight: 0,
  };
 },
 computed: {},
 methods: {
  assignKeys() {
   let initArray = [1, 2, 3, 4, 5, 6, 7, 8];
   let assignArray = [];
   for (i = 0; i < 8; i++) {
    let ramNumber = Math.floor(Math.random() * initArray.length);
    assignArray.push(initArray[ramNumber]);
    initArray.splice(ramNumber, 1);
   }
   console.log(assignArray);
   for (i = 0; i < 8; i++) {
    this["light" + (i + 1) + "key"] = assignArray[i];
   }
  },
  pressKey(num) {
   const key = "key" + num + "pressed";
   if (this[key]) {
    return true;
   } else {
    this[key] = !this[key];

    let newLight = 0;
    for (i = 1; i <= 8; i++) {
     if (this["light" + i + "key"] === num) {
      newLight = i;
     }
    }
    let lightDifference = newLight - this.lastLight;
    if (
     (this.lastLight === 8 && newLight === 1) ||
     lightDifference === 1 ||
     this.lastLight === 0
    ) {
     console.log("this is the new light" + " " + newLight);
     console.log("this is the last light" + " " + this.lastLight);

     this["light" + newLight + "active"] = true;

     this.lastLight = newLight;
     this.counterLights++;
     if (this.counterLights === 8) {
      this.counterLights = 0;
      this.lastLight = 0;
      for (i = 1; i <= 8; i++) {
       this["light" + i + "active"] = false;
       this["key" + i + "pressed"] = false;
      }
      this.assignKeys();
      return true;
     }
     return true;
    } else {
     this.counterLights = 0;
     this.lastLight = 0;
     for (i = 1; i <= 8; i++) {
      this["light" + i + "active"] = false;
      this["key" + i + "pressed"] = false;
     }
     return true;
    }
   }
  },
 },
 created() {
  this.assignKeys();
 },
});

app.mount("#game");
