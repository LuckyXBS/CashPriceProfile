const loader = document.querySelector(".loader");
         window.onload = function(){
           setTimeout(function(){
			 document.title = 'Cash Price - загрузка'
             loader.style.opacity = "0";
             setTimeout(function(){
               loader.style.display = "none";
			   document.title = 'Cash Price'
             }, 500);
           },500);
         }
		 
var witdrawsys = 0;
var paysys = 0;
		 
const dropDown = document.querySelector(".dropdown-menu");
const closeDrop = document.querySelector(".close-menu");
const openDrop = document.querySelector(".profile");
	
	openDrop.addEventListener("click", () => {
      dropDown.classList.add("active");
    });
	
	closeDrop.addEventListener("click", () => {
      dropDown.classList.remove("active");
    });
	
	
function renderTime() {
			var currentTime = new Date();
			var diem = "AM";
			var h = currentTime.getHours();
			var m = currentTime.getMinutes();
			var s = currentTime.getSeconds();
			setTimeout('renderTime()',1000);
			if (h == 0) {
				h = 12;
			} else if (h > 12) { 
				h = h - 12;
				diem="PM";
			}
			if (h < 10) {
				h = "0" + h;
			}
			if (m < 10) {
				m = "0" + m;
			}
			if (s < 10) {
				s = "0" + s;
			}
			var myClock = document.getElementById('clockDisplay');
			myClock.textContent = h + ":" + m + ":" + s + " " + diem;
			myClock.innerText = h + ":" + m + ":" + s + " " + diem;
			}
			renderTime();
			
function copyBtn() {
    var copyText = document.getElementById('copy-text');
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
	n('Скопировано!', 'success');
}

function copyNumbBtn() {
    var copyNumb = document.getElementById('copy-number');
    copyNumb.select();
    copyNumb.setSelectionRange(0, 99999)
    document.execCommand("copy");
	n('Скопировано!', 'success');
}

function copyDescBtn() {
	var copyDesc = document.getElementById('copy-desc');
    copyDesc.select();
    copyDesc.setSelectionRange(0, 99999)
    document.execCommand("copy");
	n('Скопировано!', 'success');
}

function copyCashBtn() {
	var copyCash = document.getElementById('copy-cash');
    copyCash.select();
    copyCash.setSelectionRange(0, 99999)
    document.execCommand("copy");
	n('Скопировано!', 'success');
}

function choosePay(payId, e) {
    const paySys = {
        '1':{'data': 'piastrix'},
        '2':{'data': 'qiwi'},
        '3':{'data': 'card'},
        '4':{'data': 'fkwallet'}
    }
    $('.depositBlock').removeClass('active').css('filter', 'blur(3px)');
    $(e).addClass('active').css('filter', 'blur(0px)');
    $('#'+paySys[payId]['data']).show(100);
    paysys = paySys[payId]['data'];
}

function chooseWithdraw(payId, e) {
    const withdraw = {
        '1':{'data': 'qiwi'},
        '2':{'data': 'piastrix'},
        '3':{'data': 'fkwallet'},
        '4':{'data': 'card'}
    }
    $('.action').removeClass('active').css('filter', 'blur(3px)');
    $(e).addClass('active').css('filter', 'blur(0px)');
    witdrawsys = withdraw[payId]['data'];
}

function load_deposits() {
    $.post('/user/getPayment', {_token: $('meta[name="csrf-token"]').attr('content')}).then(e=>{
        if(e.success){
            $('#deposit_table').html('');
            //<td>${e.payments[i].id}</td>
            for(i=0;i<=e.payments.length-1;i++) {
                $('#deposit_table').append(`<tr>

                          <td class="text-muted">${e.payments[i].sum}</td>
                          <td class="text-muted">${e.payments[i].system}</td>
                        </tr>`);
            }
        }
        if(e.error){
            return n(e.message, 'error');
        }
    });
}

function n(text, type, time, closein) {
    timen = (time) ? time : 1000;
    bdsd = (closein) ? closein : true;
    new Noty({
        text        : text,
        type        : type,
        dismissQueue: true,
        layout      : 'bottomRight',
        theme       : 'mint',
        progressBar: true,
        timeout: timen,
        killer: bdsd
    }).show();
}

function withdraw() {
    $.post('https://hrust.uno/user/withdraw', {_token: $('meta[name="csrf-token"]').attr('content'), wallet:$('#input-number').val(),sum:$('#input-amount').val(), system: witdrawsys}).then(e=>{
        if(e.success){
            return n('Заявка была создана!', 'success');
            location.replace('withdraw.php');

        }
        if(e.error){
            return n(e.message, 'error');
        }
    });
}

function offline_function () {
    return n('Данная функция временно недоступна!', 'error');
}

socket.on('updatebalance', function (data) {
    if(!client_user) return false;
    if(data.user == client_user) {
        $('#balance').html(data.balance);
    }
});