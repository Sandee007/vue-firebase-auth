new Vue({
    el: '#app',
    data: {
        title: 'Becoming a Vue Ninja',
        name: 'Sandee',
        url: 'https://www.youtube.com',
        classes: ['one', 'two'],
        wage: 10,
        coords: {
            x: 0 , y:0
        },
        visibility: true,
        price: 0,
        qty: 0
    },
    methods: {
        greet(time){
            return `Hello there ${this.name}, good ${time} ! `
        },
        changeWage(amount){
            this.wage += amount;
        },
        logEvent(e){
            console.log(e);
        },
        logCoords(e){
            this.coords.x = e.offsetX;
            this.coords.y = e.offsetY;
        },
        updateName(e){
            this.name = e.target.value;
        },
        toggleVisibility(e){
            this.visibility = !this.visibility;
        },
        addTen(){
            this.qty+= 10*100;

        }
    },
    // watch: {
    //     price : (qty)=>{
    //         let vm = qty;
    //         return vm;

    //     } 
    // }
})