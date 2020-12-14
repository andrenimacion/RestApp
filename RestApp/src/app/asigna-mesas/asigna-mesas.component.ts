import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import interact from 'interactjs';
import { stringify } from 'querystring';
import Swal from 'sweetalert2';
import { MenuGetService } from '../Services/menu-get.service';
import { MesasControllerService } from '../Services/mesas-controller.service';

@Component({
  selector: 'app-asigna-mesas',
  templateUrl: './asigna-mesas.component.html',
  styleUrls: ['./asigna-mesas.component.css']
})
export class AsignaMesasComponent implements OnInit {

  public cnS: boolean = false;

  public modalTitle;

  public heightDiv = (screen.height - 145) + 'px';
  public value = 0 ;
  public counterTimer;
  // public arr = [];
  public posXm;
  public posYm;
  public SizeX;
  public SizeY;
  public bRadius;
  public colorMesa;

  //#region NGMODEL VARS
  
  public NG_TagNameMesa;
  public NG_CodecMesa;
  public NG_EscalaX;
  public NG_EscalaY;
  public NG_NumberMesa;
  public NG_TextMesa;
  public NG_MeseroName;
  public NG_WaitTime =  2;
  public NG_BorderRadius;
  public codecMesero;
  public cantPlato;
  
  //#endregion

  public meseroData: any = [];

  public tiempoArr: any = [];

  public passwordShow;
  public passwordType: string = 'password';

  public vRad: number = 0;

  public mesArr:any = [];

  constructor( public data: MesasControllerService, public menu: MenuGetService ) { }

  ngOnInit() {
    this.getMesasDB();
    this.gOptMes();
    this.getMenuClass();
    this.getPedidosGen();
    // this.tiempo(2);
    // this.getMeseroById();
    // console.log(this.getMesasDB());
  }


//#region Manejo del tiempo para las mesas  
  
public seg;
public min;
public hor;

tiempo(minu, a) {
  // let obj = document.getElementById(a);
  let seg = 0;
  let min = 0;
  let hor = 0;
  let sp = document.createElement('span');
  let halfMin = minu / 2;
  
  sp.setAttribute('id', `sp-${a}`)
  a.appendChild(sp);

  if(minu <= 1 ) {
    alert('cantidad de minutos ingresada no permitida');
  }
  else {
  let s = setInterval( () => {   
      seg ++;
      if(seg >= 60) {
         seg = 0;
         min ++;
      }

      if(min < minu) {
        a.style.backgroundColor = 'green';
        //console.log('recien empezamos');
      }

      if (min == halfMin || min >= halfMin && min <= minu) {
        a.style.backgroundColor = 'orange';
        //console.log('Vamos por la mitad');
      }

      else if (min >= minu) {
        this.colorMesa = 'red';
        a.style.backgroundColor = this.colorMesa;
        seg = 0;
        min = 0;
        a.removeChild(sp);
        clearInterval(s);
      }

      sp.innerText = `${min} : ${seg}`;
      sp.style.fontSize = '7pt';
      sp.style.color = 'white';

      // this.tiempoArr = {
      //   pcm: min + " | " + seg
      // };
      // console.log(this.tiempoArr);
    // console.log( ` Hor: ${this.hor} - Min: ${this.min} - Seg: ${this.seg} ` );

    }, 1000)
  }
}
//#endregion
  

  public menuClass: any = [];
  getMenuClass() {
    this.menu.getMenuMasterClass().subscribe( Menu => {
      this.menuClass = Menu;
      console.log(Menu);
    });
  }

  public PlatosClass: any = [];
  public imgBgHead: string;
  public TitleHead: string;
  getMenuMasterSubClass(cod, img, titleHead, mn, cm) {
    
    this.NG_MeseroName = mn;
    this.NG_CodecMesa  = cm

    this.imgBgHead = img;
    this.TitleHead = titleHead;
    this.menu.getMenuSubClass(cod).subscribe( Platos => {
      this.PlatosClass = Platos;
      console.log(this.PlatosClass);
    });
  }

  //#region funcion que crea MESAS
  Mesas(mw, mh, mcolor, mmarg, mbr, timeMes) {    

    //#region param. [MESAS]
    const a = document.createElement('section'); 
    // const lab = document.createElement('label'); 
    const b = document.getElementById('boxA');

    this.NG_EscalaX = mw;
    this.NG_EscalaY = mh;

    a.setAttribute('class', 'Mesas_Create_Js');
    a.style.width           = this.NG_EscalaX;
    a.style.height          = this.NG_EscalaY;
    a.style.backgroundColor = mcolor;
    a.style.borderRadius    = mbr;
    a.style.margin          = mmarg;
    a.style.color           = 'white';
    a.style.display         = 'flex';
    a.style.justifyContent  = 'center';
    a.style.alignItems      = 'center';
    a.style.flexDirection   = 'column';
    a.style.fontSize        = '15pt';
    a.style.cursor          = 'pointer';
    a.style.textAlign       = 'center';
    b.appendChild(a);

    //#region [BOTON DE REMOVER MESA]
    const removeBtn = document.createElement('div');
    const removeBtnIcon = document.createElement('span');

    removeBtnIcon.setAttribute('class', 'icon-trash-1');
    removeBtn.setAttribute('class', 'animated bounceIn fast');
    removeBtn.appendChild(removeBtnIcon);
    removeBtn.style.display = 'flex';
    removeBtn.style.justifyContent = 'center';
    removeBtn.style.width = '30px';
    removeBtn.style.height = '30px';
    removeBtn.style.borderRadius = '100%';
    removeBtn.style.cursor = 'pointer';
    removeBtn.style.display = 'none';
    removeBtn.style.marginLeft = '-15px';
    removeBtn.style.alignItems = 'center';
    removeBtn.style.boxShadow = '0px 0px 8px rgba(0,0,0,0.3)';
    removeBtn.style.backgroundColor = 'orange';
    removeBtn.style.color = 'white';
    a.appendChild(removeBtn);
    //#endregion

    //#region [BOTON DE MENU]
  const menu = document.createElement('div');
  const menuIcon = document.createElement('span');
  menuIcon.setAttribute('class', ' icon-dot-3');
  menu.setAttribute('class', 'animated bounceIn fast');
  menu.appendChild(menuIcon);
  menu.style.display = 'flex';
  menu.style.justifyContent = 'center';
  menu.style.width = '30px';
  menu.style.height = '30px';
  menu.style.borderRadius = '100%';
  menu.style.marginLeft = '-15px';
  menu.style.marginTop = '5px';
  menu.style.cursor = 'pointer';
  menu.style.display = 'none';
  menu.style.alignItems = 'center';
  menu.style.boxShadow = '0px 0px 8px rgba(0,0,0,0.3)';
  menu.style.backgroundColor = 'whitesmoke';
  menu.style.color = 'gray';
  a.appendChild(menu);
  //#endregion

    //#region [MENU DESPLEGABLE]
    const despMenu = document.createElement('div');
    const liMenu = document.createElement('li');
    const InpRange = document.createElement('input');
    const labelInp = document.createElement('label')
    const btnGuardar = document.createElement('button');
    InpRange.setAttribute('type', 'range');
    InpRange.setAttribute('valueMin', '0');
    InpRange.setAttribute('valueMax', '100');
    InpRange.setAttribute('value', `${this.vRad}`);
    InpRange.setAttribute('id', 'RadRange');
    despMenu.setAttribute('class', 'animated fadeInRight fast');
    despMenu.style.display = 'flex';
    despMenu.style.flexDirection = 'column';
    despMenu.style.justifyContent = 'center';
    despMenu.style.width = '150px';
    despMenu.style.height = 'auto';
    despMenu.style.borderRadius = '4px';
    despMenu.style.display = 'none';
    despMenu.style.marginLeft = '-15px';
    despMenu.style.alignItems = 'center';
    despMenu.style.boxShadow = '0px 0px 8px rgba(0,0,0,0.3)';
    despMenu.style.backgroundColor = 'whitesmoke';
    despMenu.style.color = 'black';
    despMenu.innerHTML = 'Configuraciones'
    btnGuardar.setAttribute('class', 'btn btn-success');
    btnGuardar.innerText = 'Guardar'
    btnGuardar.style.width = '100%'
    liMenu.style.listStyle = 'none';
    liMenu.appendChild(labelInp);
    // let vr = <HTMLInputElement> document.getElementById('RadRange');
    InpRange.addEventListener('change', () => {
      this.NG_BorderRadius = InpRange.value;
      labelInp.innerText = this.NG_BorderRadius;
      a.style.borderRadius = this.NG_BorderRadius + '%';
    });
  
    // btnGuardar.addEventListener('click', () => {
    //   this.mesasUpdate();
    // })
  
    a.appendChild(despMenu);
    despMenu.appendChild(liMenu);
    despMenu.appendChild(btnGuardar);
    liMenu.appendChild(InpRange);

  //#endregion

    //#region eventos de mesa para mostrar menu de configuracion e eliminar

  menu.addEventListener('click', () => {
    despMenu.style.display = 'flex';
  });
  menu.addEventListener('dblclick', () => {
    despMenu.style.display = 'none';
  });
  
  a.addEventListener('mouseover', () => {
    // removeBtn.style.transition = 'ease all 0.5s';
    removeBtn.style.display = 'flex';
    menu.style.display = 'flex';
    // console.log(removeBtn.getAttribute('id'));
    // console.log(a.getAttribute('id'));
  });

  a.addEventListener('mouseleave', () => {
    // removeBtn.style.transition = 'ease all 0.5s';
    removeBtn.style.display = 'none';
    menu.style.display = 'none';
    despMenu.style.display = 'none';
    // console.log(removeBtn.getAttribute('id'));
    // console.log(a.getAttribute('id'));
  });
  //#endregion

  }

  //#endregion
  public cargo;
  public cedula;
  public empfoto;
  public nombres;
  public arrMeser: any = [];
  public mensajeError: string;
  public arrPedido: any = [];
  passMesero() {
     console.log(this.codecMesero);
     let arr: any = {
        passMesero: this.codecMesero
     }
     this.data.controllMesero(arr).subscribe( pass => {
        console.log(pass);
        this.data.getMeseroByIdControl(this.codecMesero).subscribe( mesero => {
          this.arrMeser = mesero;

          if(this.arrMeser == null ) {
            return false;
          }

          else {
            let arr: any = [];
            
            Swal.fire({
              icon: 'success',
              html: `<strong style="color: green;">${document.getElementById('exampleModalLabel').textContent}
                    </strong> ha sido asignada al siguiente mesero: </br>
                    <strong style="color: green;">${this.arrMeser[0].nombres}<strong>`,
              showConfirmButton: false,
              timer: 1500
            })

            // arr = {
            //   id       :   this.arrMeser[0].id,
            //   cargo    :   this.arrMeser[0].cargo,
            //   cedula   :   this.arrMeser[0].cedula,
            //   empfoto  :   this.arrMeser[0].empfoto,
            //   nombres  :   this.arrMeser[0].nombres,
            //   tiempo   :   this.NG_WaitTime,
            //   codMesa  :   this.NG_CodecMesa
            // }

            // this.meseroData.push(arr);            
            console.log(this.arrMeser);            
            this.postPedido(this.arrMeser[0].nombres, this.NG_CodecMesa, this.NG_WaitTime);                
            
          }

        });
     });
  }

  public pedProccess: any = []
  postPedido(meseroN, codM, tiempE) {

  // #region Data a enviar 
  //------------------------------------------------------
  // public string      MeseroNombre     {  get; set;   }
  // public string      CodMesa          {  get; set;   }
  // public int         TiempoEspera     {  get; set;   }
  // public decimal     SumPedido        {  get; set;   }
  // public decimal     SumValor         {  get; set;   }
  // public DateTime    FechaPedido      {  get; set;   }
  // public int         CantPedido       {  get; set;   }
  // public decimal     CampA            {  get; set;   }
  // public string      CampB            {  get; set;   }
  // public string      CampC            {  get; set;   }
  // public string      EstadoPedido     {  get; set;   }
  //------------------------------------------------------
  //#endregion

    this.arrPedido = {
      meseroNombre : meseroN,
      codMesa      : codM,
      tiempoEspera : tiempE
    }

    // console.log(this.arrPedido);

    this.menu.postPedidos(this.arrPedido)
             .subscribe( Pedido => {
                this.pedProccess = Pedido;
                this.menu
                    .getPedsGen()
                    .subscribe( gPeds => {
                      this.pedProccess = gPeds;
                      console.log(gPeds);
                });
              });
    
  }

  asignParametros(mn, cm) {
    this.NG_MeseroName = mn;
    this.NG_CodecMesa  = cm;
  }

  getPedidosGen() {
    this.menu
    .getPedsGen()
    .subscribe( gPeds => {
      this.pedProccess = gPeds;
      console.log(gPeds);
    });
  }

  ordenar() {
    console.log('ordenando')
  }

  getMeseroById(id) {
    this.data.getMeseroByIdControl(id).subscribe( y => {
       this.arrMeser = y;
       console.log(y);
       Swal.fire({
         icon: 'success',
         html: `<strong style="color: green;">${document.getElementById('exampleModalLabel').textContent}
               </strong> ha sido asignada al siguiente mesero: </br>
               <strong style="color: green;">${this.arrMeser[0].nombres}<strong>`,
         showConfirmButton: false,
         timer: 1500
       })
    }, (errorServicio)=>{      
     console.log(errorServicio);
     this.mensajeError = errorServicio.error.error.message;
   })
  }
   
  passwordHidShow() {
    
    if (!this.passwordShow) {
      this.passwordShow = true;
      this.passwordType = 'text';
    }

    else {
      this.passwordShow = false;
      this.passwordType = 'password';
    }

  }

  //#region getMesas
  getMesasDB() {

  this.data.getMesasGen().subscribe( resp => {
    this.mesArr = resp;
    console.log(this.mesArr);
    for ( let i = 0; i <= this.mesArr.length; i ++) {
      this.colorMesa = `${this.mesArr[i].texturaMesa}`;
      this.Mesas(`${this.mesArr[i].sizeX}`, `${this.mesArr[i].sizeY}`, this.colorMesa, '5px',
                 `${this.mesArr[i].borderRadius}` , `${this.mesArr[i].TiempoEspera}`);

      const tg = document.getElementsByTagName('section')[i];
      let a = i + 1;
      tg.setAttribute('id', `m-${a}`);
      let PushCodMes = document.getElementById(`m-${a}`);
      this.NG_CodecMesa = document.getElementById(`m-${a}`).getAttribute('id');
      PushCodMes.innerText = this.NG_CodecMesa;
      console.log(this.NG_CodecMesa);
      
      let lab = document.createElement('label');
      PushCodMes.appendChild(lab);
      lab.innerHTML      = `<span class="icon-clock-1"></span> ${this.NG_WaitTime} min`;
      lab.style.color    = 'white';
      lab.style.fontSize = '9pt';
            
      //#region asignacion a meseros
      tg.addEventListener('dblclick', () => {
        const exampleModalLabel = document.getElementById('exampleModalLabel');
        tg.setAttribute('data-toggle', 'modal');
        tg.setAttribute('data-target', '#exampleModal');
        console.log(tg.textContent);        
        this.modalTitle = `Código de mesa ${tg.textContent}:`;
        exampleModalLabel.innerText = this.modalTitle.toUpperCase();
        let PushCodMes = document.getElementById(`m-${a}`);
        this.NG_CodecMesa = PushCodMes.getAttribute('id');
        let mt = this.tiempo( `${this.NG_WaitTime}`, PushCodMes );
        
      })
      //#endregion

      //#region arrastre mesero
      tg.addEventListener('click', () => {
        console.log('Evento Click');
        tg.style.border = 'dashed 3px #21D9DF';
      })
      //#endregion

      //#region anim a over
      tg.addEventListener('mouseover', () => {
       this.colorMesa = 'steelblue';
       tg.style.transition = 'ease all 0.5s';
       tg.style.backgroundColor = this.colorMesa;
       tg.style.transform = 'scale(0.8,0.8)';
      })
      //#endregion
      
      //#region anim a leave
      tg.addEventListener('mouseleave', () => {
        tg.style.transition = 'ease all 0.5s';
        tg.style.backgroundColor = `${this.mesArr[i].texturaMesa}`;
        tg.style.transform = 'scale(1,1)';
       })
       //#endregion  
    
       //#region Cancelar el addEventListener y asignacion a modal   
      const cerrarMods = document.getElementById('cerrarMods');
      cerrarMods.addEventListener('click', () => {
        tg.setAttribute('data-toggle', '');
        tg.setAttribute('data-target', '');
        console.log('hey estamos cerrando')
      });
      //#endregion
    
    }
  });

}
//#endregion

public meserosArr: any = [];
gOptMes() {
  this.data.getOptionsMeseros().subscribe( meseros => {
    this.meserosArr = meseros;
    console.log(this.meserosArr);
  });
}

mesasSave(sx, sy, cl, br, tm) {

    let objMesa: any = { 
      TagNameMesa  : '',
      CodecMesa    : '',
      SizeX        : sx,
      SizeY        : sy,
      NumberMesa   : 0,
      TexturaMesa  : cl,
      MeseroName   : '',
      TiempoEspera : tm,
      BorderRadius : br
    }

    this.data.saveDataMesas(objMesa).subscribe( x => {
      console.log('Guardado');
      this.Mesas(sx, sy, cl, '', br, tm);
    });

    console.log(objMesa);

}

// postTime(id, tEsp, tm, cm, sx, sy, color, mesName, br) {
//   console.log('postime')
//   let objMesa: any = {
//     id: id,
//     tagNameMesa: tm,
//     codecMesa:   cm,
//     sizeX: sx,
//     sizeY: sy,
//     numberMesa: 0,
//     texturaMesa: color,
//     meseroName:  mesName,
//     tiempoEspera: tEsp,
//     borderRadius: br
//   }

//   console.log(objMesa);
//   this.data.updateMesas(id, objMesa).subscribe( y => {
//     console.log('Tiempo establecido');
//     console.log(y);
//   })
// }

mesasUpdate( id, cm, tm, sx, sy, color, mesName, tEsp, br ) {
  let objMesa: any = {
    id: id,
    tagNameMesa: tm,
    codecMesa: cm,
    sizeX: sx,
    sizeY: sy,
    numberMesa: 0,
    texturaMesa: color,
    meseroName: mesName,
    tiempoEspera: tEsp,
    borderRadius: br
  }
  // console.log('objMesa');
  this.data.updateMesas(id, objMesa)
           .subscribe( y => {
            console.log('Update');
            console.log(y)
  });
}

//#region 
// public posit = [];
// moveHandler(obj) {
//   let a = document.getElementById(`${obj}`); 
//   const position = {x : 0, y : 0};
//   console.log(a);
//   interact(a).resizable({
//        // resize from all edges and corners
//        edges: {
//            left: false,
//            right: true,
//            bottom: true,
//            top: false
//        }, listeners: {
//            move(event) {

//                const target = event.target;
//                let x = (parseFloat(target.getAttribute('data-x')) || 0);
//                let y = (parseFloat(target.getAttribute('data-y')) || 0);
               
//                // update the element's style
//                target.style.width = event.rect.width + 'px';
//                target.style.height = event.rect.height + 'px';
               
//                let sizeXa = event.rect.width + 'px';
//                let sizeYa = event.rect.height + 'px';

//                console.log(sizeXa);
//                console.log(sizeYa);

//               //  console.log('X: ' + this.sizeX);
//               //  console.log('Y: ' + this.sizeY);
//               // translate when resizing from top or left edges

//                x += event.deltaRect.left;
//                y += event.deltaRect.top;

//                // target.style.webkitTransform = target.style.transform =
//                //     'translate(' + x + 'px,' + y + 'px)';

//                target.setAttribute('data-x', x);
//                target.setAttribute('data-y', y);
//               // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
           
//            }
//        },

//        modifiers: [
//            // keep the edges inside the parent
//            interact.modifiers.restrictEdges({
//                outer: 'parent'
//            }),
//            // minimum size
//            interact.modifiers.restrictSize({
//                min: {
//                    width: 50,
//                    height: 50
//                }
//            }),
//            interact.modifiers.snap({
//             targets: [
//               interact.snappers.grid({ x: 10, y: 10 })
//             ],
//             range: Infinity,
//             relativePoints: [ { x: 0, y: 0 } ]
//           })
//        ],
//        inertia: true
//    }).draggable({
//      listeners: {
//        start(event) {
//          console.log(event.type, event.target);
//        },
//        move(event) {
//          position.x += event.dx;
//          position.y += event.dy;
//          event.target.style.transform = `translate(${position.x}px, ` + `${position.y}px)`; 
//         // 1| Idm, 2| Tgn, 3| Cms, 4| PX, 5| PY, 6| SX, 7| SY, 8| NM, 9| TM, 10| Mn, 11| Te, 12| Br
//         // obj.addEventListener('mouseup', () => {
          
//         //   // this.mesasUpdate(obj.getAttribute('id'), '', '', '', '', '', '', 0, '', '', '', '');
//         //   // console.log('Evento detectado');
//         //   var ma = obj.getAttribute('id');
//         //   console.log(ma);          

//         // })
//         // this.position.push(position);
//        },
//      },
//      modifiers: [
//       interact.modifiers.snap({
//        targets: [
//          interact.snappers.grid({ x: 30, y: 30 })
//        ],
//        range: Infinity,
//        relativePoints: [ { x: 0, y: 0 } ]
//      })
//   ],
//   });
//   }
//#endregion

}

