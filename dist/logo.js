import { text } from "./theme.js";
const logoSmall = text.orange(`
  ..............:7Xri..................
  .........:S0@M@87r0@MM0,.ri..........
  .......,.raaXi;XZSW;:8@W;2MW.........
  ......,7,...8807.:.:,.iaiiWM;........
  ....X@XiW7iXW:r.8,Wi0X:,..i:Z,,0,....
  ..78@X,B.Srr.;.Si.BWMMMM88:...::ZS...
  ..ar.X;Xr..,,0:7iXWWBZrWMMrMi:::;Xa..
  ...SM0r,;..7Xi.,:SZriM,..iWMZ,,.;:ar.
  ..ZB:..27;.:ZZSa8:8MMMM@MMMMMMMZ,.,8.
  .i,.0,.W0,,iXX,aX.rrrr;Z;0MMZi.:,..8.
  ..,M8:.S2.X..,i:r.:S7XXiZW@@MMMrMi,2.
  ..2MZX..,.W,.:..,....:;:S2X8B2:iZ.7i.
  ..;XM7,.:,2.:a.2:.i..,....,iWMMM:....
  ....8a.7Z2..XWr,S:Z:iX..:X2WBMM0:....
  .....7ii000..Z@B...a;Zai...ri;.......
  ........,BMW,.,;@S....XM7............
  ...........2M0,..........;:..........
  ................,....................
  `.replace(/\./g, " "));
const logo80 = text.yellow(`
                             :SB@MMWBZSr,
                         ,irXX7ri, iaBWMMMMM@a:    :,
                    i2WMMMMMMMMMMMM@a:7ZZWMMMMM@7 :i,02,
                 ,7S7;i::i;72Z2S0@ZZWMW;r7iBWWM@M2 rM0BM;
                   ia@@08Z0B2:  :,i0r rBZ,: XSBMZM: 2MMMMi
                 iBZ7i:,   iXZZSi   i;  ia   ;:@22: ;M@MMS
                 ,:    ,, ,7:  ,Xi  ;r,   :   ,SS,  rBZ8MiX7,
             r8WZ: XW@0Z8WMZ: rX: :M2;BZ ;r:   ;,   ::Si;ii   :7
          :8MM@a,:@0:      XM2  , i@WZMZ 28MMMBr     , :ZW@a  iB@;
        ,Z0MMWZi BB  ,aZ8i      S7,,  ;SXZMMMMMMMa::r ,         7M8,
        :;MMZ:   8Z  :07Z7   @X XaSa,:8MMMM2ZMMMMMMM@MS   i2 ,BX :WW:
        iM0:  ,X,i8r        XM:,S7a; XZWMMMM2,8MMMMMWr8M2, iS,    ,B@:
        87  iB0:,,,XZX,  XW S@    ,;aZ00ZZ2SX7,:S8082,iM00, :i  ar ,WW,
        : :0MB@Zi,,      iM2 Sr :;Xriirr:  ZM8      ,XBM@X   :   ,: i@a
         rMMMW0X:  8Z     : ;a00Z7,,2BMMWBZXi  :,   iaWMMMMB7    :;  2Wi
        rMMBr     ZW ,i   rW7a00Z702 78@MMMMMMMM0@MMM@@@MMMMMM0r     iWS
       :MZ,  ,7: ;M2;Zii,:MrB,   2S07 ZZ8BZ,XB0WMMMMMMMMW280BWWWW8i   8Z
       S:  ,ZZ   XMZW:rr, Z;B:  ,ZXSi S2222XXX7ZBZ;:BMMM@X:   irr:    ZZ
          ;MZ;   rMMX   : ,27XZZS;S;     ii    ,i,ZMMMMMMMMM@7  ,8Z   aa
         ;MM0: ,  BMi  iS   ,irr;:;, :7,,Wa S8Z,,aXMZWBBMMMMMMS:MM8  ,ZX
        ,WMM0,2   :@,  0rr        ;@Br2,7S ::r7,ir;rr8ZZMMMMMMSiMMa  ;ai
        rMMM8a7    ,:  @0:  ,:    ,   ,         ,Z222X77@MW02i iZW: ,SX
        X@SM0@:        BB   ;r   :S     ,;7XS77; ,XZZZZ82r, :;i ,,  ;X:
        ;riMMM:  , r , ;0 ,:7Z  ;SS   ;     ,       ,:  iZ@MMMMM2
           8MM;  ; Z ;i ;, XrMi  B8   X7 , ,7        ,XZWMMMMMM@B
           ,WM2  7;87:8    XXMW, ,Bi ;7@i i Z     ,;2aa8MWWMMMM02
            ,B@, :ZaMiBX   :ZBMWr, ;  XB@iiXX2::     Xa7;80Z@0a :
              X8  r8WMaMr   iZ0MM0,    ,X@;;ZWX8       :S; 7:
               ,i  rBWMMMr   :X;WM@r      ir:0@W0
                    ,0@MMM2    : ;BMWi        7@MW:
                      :0MMMWi       ;aBS:       i8MZ:
                         XBMMW;                    ,;r,
                            iS0@8;
`);
export function getLogo() {
    const screenWidth = process.stdout.columns || 80; // Terminal width
    return screenWidth >= 80 ? logo80 : screenWidth < 64 ? "" : logoSmall;
}
