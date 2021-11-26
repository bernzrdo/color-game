(()=>{

    const COLORS = ['red','orange','yellow','green','blue','purple','pink','black'];

    $('.start-btn').click(function(){

        $('.start').addClass('off');
        generate();
        $('.game').removeClass('off');

    });

    capitalize = str=>str[0].toUpperCase() + str.substr(1);

    var points = 0;
    var highscore = 0;
    var isAnswer1;
    var timeInterval;
    var startTime;

    function generate(){

        COLORS.sort(()=>Math.random()-.5);

        var correct = COLORS[0];
        var wrong = COLORS[1];

        if(matchMedia('(prefers-color-scheme: dark)').matches){
            if(correct == 'black') correct = 'white';
            if(wrong == 'black') wrong = 'white';
        }

        $('.color')[0].className = `color ${correct}`;
        $('.color').text(capitalize(wrong));

        isAnswer1 = Math.random()<.5;

        $('.answer1').text(capitalize(isAnswer1 ? correct : wrong));
        $('.answer2').text(capitalize(isAnswer1 ? wrong : correct));

        startTime = Date.now();
        $('.elapsed').css('width', 0);

        clearInterval(timeInterval);
        timeInterval = setInterval(()=>{

            const now = Date.now();

            $('.elapsed').css('width', ((now-startTime)*100/3e3)+'%');
            if(now > startTime + 3e3) endGame();

        });

    }

    $('.answer1').click(function(){
        if(isAnswer1) addPoint();
        else endGame();
    });

    $('.answer2').click(function(){
        if(!isAnswer1) addPoint();
        else endGame();
    });

    function addPoint(){
        $('.game').addClass('off');
        points++;
        setTimeout(()=>{
            generate();
            $('.game').removeClass('off');
        },100);
    }

    function endGame(){
        clearInterval(timeInterval);
        $('.game').addClass('off');
        $('.start').removeClass('off');
        if(points > highscore) highscore = points;
        $('.score').html(`Score: ${points}<br>Highscore: ${highscore}`);
        points = 0;
    }

})();