/* First thing, we're going to do is the size buttoms animation, we'll start by selecting all the size buttons 
So, in order to add click event to each size element, we will use the forEach method*/

/*Now,before starting the color Animation, we need to add an attribute named "primary"to each color element where we will put the hex code of that color
2. we'll select all the color buttons
3.we need first to add the class "active to the color that we clicked"
4.same thing we did with size buttons
5.So we need first to get the value of the attribute "primary" of the color button that we clicked, which means we'll get the hex code of that color
6.Finally, we'll change the value of the css variable "primary" to the color that we get from the attribute "primary"
*/

/* Next thing we're going to do is selecting the shoe in the color that we clicked and display it.
1. to do that, we first need to get the value of the attribute "color" of the color button that we clicked
2. we need to select the shoe image whose the attribute "color" has the same value. But before, we need to select all the shoe images 
3. so to display a shoe image, it must have the class "show", so we need to remove the class from all the shoe images
4. and add it to the shoe that we want to display, and in order to select that shoe, we simply use the css attribute selector
*/

/* The last thing we're going to do, to select the gradient in the color that we clicked and display it
1. First we need to select all the gradients
2. So in order to display it, we need to set its z-index to 0, because all the gradients have z-index of -2. < CSS 65行>
3. we need to creat the animation that plays when we display the gradient < CSS >
4. so when we click a color, we first need to remove the class "first" from all the gradients elements, then add it to the gradient that we want to display
5. and the gradient that we want to display will have the same value of the attribute "color" as the color button that we clicked, so to select it we simply use the css attribute selector
6. But the problem is that we always have the black gradient in the back, so we need every time we click a color to set the last gradient behind the current gradient
7. to fix that, we need to creat another class called "second", where we will have z-index of -1, because the last gradient must have z-index value between the z-index of other gradients and of the current gradient


8. Now all we need is to add the class "second" to the last gradient
9. first we need to select the last gradient
10. okay, now we need to know the last color "prevColor" every time we click a color
11. In the beginging, the last color is blue, because we already have the blue gradient displaying
12. then in the last line of our function, which means when the function will end, we will set the value of the variable "prevColor" to the color that we clicked
13. and so when we click a new color next time, after we select the last gradient using this value, we will set the value of the cariable "prevColor" again to the color that we clicked
// TODO:
14. that's it, when we click a color, the class "first" is added to its gradient, and when we click a new color again, the "first" class is removed from this gradient, and the "second" class is added
15. to fix that, we have to create a boolean variable, and set its value to false when clicking a color, and when the animation ends, we have to set it again to true
16. so when the animation is playing the boolean variable is setting to false
17. and simply when we click a new color, we will check the value of the boolean variable. If it's true the function will execute, if note it will not execute
18. " !animationEnd " means "animationEnd === false"
*/

const sizes = document.querySelectorAll('.size');
const colors = document.querySelectorAll('.color');
const shoes = document.querySelectorAll('.shoe');
const gradients = document.querySelectorAll('.gradient');
const shoeBg = document.querySelector('.shoeBackground');

let prevColor = "blue";
let animationEnd = true;

function changeSize(){
    sizes.forEach(size => size.classList.remove('active'));
    this.classList.add('active');
}

function changeColor(){
    if(animationEnd === false) return;


    let primary = this.getAttribute('primary');
    let color = this.getAttribute('color');
    let shoe = document.querySelector(`.shoe[color="${color}"]`);
    let gradient = document.querySelector(`.gradient[color="${color}"]`);
    let prevGrandient = document.querySelector(`.gradient[color="${prevColor}]`);


    colors.forEach(c => c.classList.remove('active'));
    this.classList.add('active');

    document.documentElement.style.setProperty('--primary', primary);

    shoes.forEach(s => s.classList.remove('show'));
    shoe.classList.add('show');

    gradients.forEach(g => g.classList.remove('first','second'));
    gradient.classList.add('first');
    prevGrandient.classList.add('second');

    prevColor = color;
    animationEnd = false;

    gradient.addEventListener('animation', () => {
        animationEnd = true;

    } );

}

sizes.forEach(size => size.addEventListener('click', changeSize));
colors.forEach(c => c.addEventListener('click', changeColor));

// Change the shoeBackground element height, in which, its height will be almost the same height of the shoe
let x = window.matchMedia("(max-width: 1000px)");

// when we say x.matches, it's like saying: @media(max-width:1000px{})
// first we need to get the shoe height
function changeHeight(){
    if(x.matches){
        let shoeHeight = shoes[0].offsetHeight;
        shoeBg.style.height = `${shoeHeight * 0.9}px`;
    }
    else{
        shoeBg.style.height = "475px";
    }
}

window.addEventListener('resize', changeHeight);

