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

  public heightDiv = (screen.height - 145) + 'px';
  public value = 0 ;
  public arr = [];
  public posXm;
  public posYm;
  public SizeX;
  public SizeY;
  public bRadius;

  constructor( public data: MesasControllerService ) { }

  ngOnInit() { }

  Mesas(mw, mh, mcolor, mmarg, mbr) {

  const a = document.createElement('div');
  const b = document.getElementById('boxA');

  console.log(this.value);
  a.setAttribute('class', 'Mesas_Create_Js');
  a.style.width = mw;
  a.style.height = mh;
  a.style.backgroundColor = mcolor;
  a.style.borderRadius = mbr;
  a.style.margin = mmarg;
  b.appendChild(a);
  this.arr.push(a);
  console.log(this.arr);

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

  for (let i = 0; i <= this.arr.length; i++) {
    a.setAttribute('id', `mesa-${i}`);
    removeBtn.setAttribute('id', `del-${i}`);
    const getIdRem = document.getElementById(`mesa-${i}`);
    this.moveHandler(getIdRem);

    // localStorage.setItem(`lmesa-${i}`, `mesa-${i}`);
    this.mesasSave('', `mesa-${i}`, '', '', '', '', i, '', 'Mn', 'Te', 'Br');

    document.getElementById(`del-${i}`).addEventListener('click', () => {
      if (getIdRem == null) {
        return false;
      } else {
        const x = getIdRem.getAttribute('id');
        console.log( x );
        b.removeChild(getIdRem);
        localStorage.removeItem(`lmesa-${i}`);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se ha eliminado la mesa!',
          showConfirmButton: false,
          timer: 500
        });
      }
    });
  }

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

  

}

// RemoveMesa(a) {
//   let b = document.getElementById(a).getAttribute('id');
//   return b;
// }

mesasSave(Tgn, Cms, PX, PY, SX, SY, NM, TM, Mn, Te, Br) {
  let objMesa: any = { 
      TagNameMesa  : Tgn,
      CodecMesa    : Cms,
      PosX         : PX,
      PosY         : PY,
      SizeX        : SX,
      SizeY        : SY,
      NumberMesa   : NM,
      TexturaMesa  : TM,
      MeseroName   : Mn,
      TiempoEspera : Te,
      BorderRadius : Br
    }

    this.data.saveDataMesas(objMesa).subscribe( x => console.log(x) );
    console.log(objMesa);
}

mesasUpdate(Idm, Tgn, Cms, PX, PY, SX, SY, NM, TM, Mn, Te, Br) {
  let objMesa: any = {
    Id           : Idm,
    TagNameMesa  : Tgn,
    CodecMesa    : Cms,
    PosX         : PX,
    PosY         : PY,
    SizeX        : SX,
    SizeY        : SY,
    NumberMesa   : NM,
    TexturaMesa  : TM,
    MeseroName   : Mn,
    TiempoEspera : Te,
    BorderRadius : Br
  }

  this.data.updateMesas(Idm, objMesa).subscribe( y => console.log(y) );

}


moveHandler(obj) {
  const position = {x : 0, y : 0};
  interact(obj)
   .resizable({
       // resize from all edges and corners
       edges: {
           left: true,
           right: true,
           bottom: true,
           top: true
       }, listeners: {
           move(event) {

               const target = event.target;
               let x = (parseFloat(target.getAttribute('data-x')) || 0);
               let y = (parseFloat(target.getAttribute('data-y')) || 0);

               // update the element's style
               target.style.width = event.rect.width + 'px';
               target.style.height = event.rect.height + 'px';
               
               let sizeXa = event.rect.width + 'px';
               let sizeYa = event.rect.height + 'px';

               console.log(sizeXa);
               console.log(sizeYa);
              //  console.log('X: ' + this.sizeX);
              //  console.log('Y: ' + this.sizeY);
              // translate when resizing from top or left edges

               x += event.deltaRect.left;
               y += event.deltaRect.top;

               // target.style.webkitTransform = target.style.transform =
               //     'translate(' + x + 'px,' + y + 'px)';

               target.setAttribute('data-x', x);
               target.setAttribute('data-y', y);
              // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
           
           }
       },

       modifiers: [
           // keep the edges inside the parent
           interact.modifiers.restrictEdges({
               outer: 'parent'
           }),
           // minimum size
           interact.modifiers.restrictSize({
               min: {
                   width: 50,
                   height: 50
               }
           }),
           interact.modifiers.snap({
            targets: [
              interact.snappers.grid({ x: 10, y: 10 })
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ]
          })
       ],
       inertia: true
   }).draggable({
     listeners: {
       start(event) {
         console.log(event.type, event.target);
       },
       move(event) {
         position.x += event.dx;
         position.y += event.dy;
         event.target.style.transform = `translate(${position.x}px, ` + `${position.y}px)`;
        //  let posA = position.x;
        //  let posB = position.y;

       },
     },
     modifiers: [
      interact.modifiers.snap({
       targets: [
         interact.snappers.grid({ x: 30, y: 30 })
       ],
       range: Infinity,
       relativePoints: [ { x: 0, y: 0 } ]
     })
  ],
  });
  }

}


