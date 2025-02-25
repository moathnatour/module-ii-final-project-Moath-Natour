export function calculateBmr(weight : number, height : number, age :number, gender : string){

    if(gender === "male"){
        return (weight *10) + (height*6.25) - (age*5) + 5;
    }

    else if(gender === 'female'){

        return (weight *10) + (height*6.25) - (age*5) - 161;
    }
}
