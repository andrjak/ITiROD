// Вспомогательные функции
let Functions =
{
    fadeOut: (elem, time = 0) => // Аналог jQuery fadeOut
    {
        let opacity = 1;
    
        var timer = setInterval(function() 
        {
            if(opacity <= 0.1) 
            {
                clearInterval(timer);
                elem.style.display = "none";
            }

            elem.style.opacity = opacity;
            opacity -= opacity * 0.1;
        }, time);
    },

    fadeIn: (elem, time = 0) =>  // Аналог jQuery fadeIn
    {
        let opacity = 0.01;
        elem.style.display = "block";
    
        var timer = setInterval(function() 
        {
            if(opacity >= 1) 
            {
                clearInterval(timer);
            }

            elem.style.opacity = opacity;
            opacity += opacity * 0.1;
        }, time);
    }
};

export default Functions;