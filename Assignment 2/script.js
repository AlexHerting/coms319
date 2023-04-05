//This is so the document items aren't loaded as null
//All button logic is working and we haev 3 views :D
document.addEventListener('DOMContentLoaded', function() {
    const view1 = document.getElementById('view1');
    const view2 = document.getElementById('view2');
    const view3 = document.getElementById('view3');
    const button = document.getElementById('cart-button');
    const button1 = document.getElementById('browser-button');
    const button2 = document.getElementById('confirmation-button');
    const button3 = document.getElementById('browser-button1');
    const button4 = document.getElementById('cart-button1');
  
    view2.style.display = 'none';
    view3.style.display = 'none';
  
    button.addEventListener('click', () => {
        view1.style.display = 'none';
        view2.style.display = 'block';
        view3.style.display = 'none';
    });

    button1.addEventListener('click', () => {
        view1.style.display = 'block';
        view2.style.display = 'none';
        view3.style.display = 'none';
    });

    button2.addEventListener('click', () => {
        view1.style.display = 'none';
        view2.style.display = 'none';
        view3.style.display = 'block';
    });

    button3.addEventListener('click', () => {
        view1.style.display = 'block';
        view2.style.display = 'none';
        view3.style.display = 'none';
    });

    button4.addEventListener('click', () => {
        view1.style.display = 'none';
        view2.style.display = 'block';
        view3.style.display = 'none';
    });

    
  });
  