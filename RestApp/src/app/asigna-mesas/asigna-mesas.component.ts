import { Component, OnInit } from '@angular/core';
import interact from 'interactjs';
import Swal from 'sweetalert2';
import { MesasControllerService } from '../Services/mesas-controller.service';

@Component({
  selector: 'app-asigna-mesas',
  templateUrl: './asigna-mesas.component.html',
  styleUrls: ['./asigna-mesas.component.css']
})
export class AsignaMesasComponent implements OnInit {

  public ShowSave: boolean = false; 

  public heightDiv = (screen.height - 145) + 'px';
  public value = 0 ;
  // public arr = [];
  public posXm;
  public posYm;
  public SizeX;
  public SizeY;
  public bRadius;

  //#region NGMODEL VARS
  
  public NG_TagNameMesa;
  public NG_CodecMesa;
  public NG_EscalaX;
  public NG_EscalaY;
  public NG_NumberMesa;
  public NG_TextMesa;
  public NG_MeseroName;
  public NG_WaitTime;
  public NG_BorderRadius;
  
  //#endregion

  public mesArr:any = [];

  constructor( public data: MesasControllerService ) { }

  ngOnInit() {
    this.getMesasDB();
    // console.log(this.getMesasDB());
  }

    //#region funcion que crea MESAS
  Mesas(mw, mh, mcolor, mmarg, mbr) {

    this.ShowSave = true;

    //#region param. [MESAS]
    const a = document.createElement('div'); 
    const b = document.getElementById('boxA');

    a.setAttribute('class', 'Mesas_Create_Js');
    a.style.width           = mw;
    a.style.height          = mh;
    a.style.backgroundColor = mcolor;
    a.style.borderRadius    = mbr;
    a.style.margin          = mmarg;
    b.appendChild(a);
    // this.arr.push(a);
    // console.log(this.arr);

    //#endregion

    // this.mesasSave(this.NG_TagNameMesa, this.NG_CodecMesa, this.NG_EscalaX, this.NG_EscalaY, this.NG_NumberMesa, this.NG_TextMesa, this.NG_MeseroName, this.NG_WaitTime, this.NG_BorderRadius);
    
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
  menuIcon.setAttribute('class', 'icon-menu');
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

    //#region eventos de mesa para mostrar menu de configuracion e eliminar
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
    // console.log(removeBtn.getAttribute('id'));
    // console.log(a.getAttribute('id'));
  });
  //#endregion

}

// RemoveMesa(a) {
//   let b = document.getElementById(a).getAttribute('id');
//   return b;
// }

getMesasDB() {

  this.data.getMesasGen().subscribe( resp => {
    this.mesArr = resp;
    console.log(this.mesArr);

    for ( let i = 0; i <= this.mesArr.length; i ++) { 
      this.Mesas(`${this.mesArr[i].sizeX}`, `${this.mesArr[i].sizeX}`, `${this.mesArr[i].texturaMesa}`, '5px', `${this.mesArr[i].borderRadius}`);
    }
    
  });
  
}


mesasSave(sx, sy, cl, br) {

    let objMesa: any = { 
      TagNameMesa  : '',
      CodecMesa    : '',
      SizeX        : sx,
      SizeY        : sy,
      NumberMesa   : 0,
      TexturaMesa  : cl,
      MeseroName   : '',
      TiempoEspera : '',
      BorderRadius : br
    }

    this.data.saveDataMesas(objMesa).subscribe( x => console.log('Guardado') );
    console.log(objMesa);

}

mesasUpdate( id ) {
  let objMesa: any = {
    id: id,
    tagNameMesa: null,
    codecMesa: null,
    posX: 232,
    posY: 222,
    sizeX: 155,
    sizeY: 155,
    numberMesa: 0,
    texturaMesa: 'red',
    meseroName: null,
    tiempoEspera: null,
    borderRadius: null    
  }
  // console.log('objMesa');
  this.data.updateMesas(id, objMesa).subscribe( y => {
    console.log('Update');  
    console.log(y)
  } );
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

