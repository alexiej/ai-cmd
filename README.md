# AI Command-line tool

Version: 	1.0.0

The AI Command-line Tool enhances your Git workflow by using AI models to automatically generate high-quality commit messages.
Currently, it supports OpenAI, with plans to expand support to other models in future releases.
It helps streamline the commit process by providing tailored, insightful messages
based on the changes in your repository, saving you time and ensuring consistent
commit formats.

With the AI Command-line Tool, you can:
- Automatically generate conventional commit messages.
- Easily configure and switch between models.

```markdown
|
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
```



## Features

- **AI-powered commit messages**: Automatically generate detailed commit messages based on code changes.
- **Support for multiple AI models**: Easily switch between OpenAI models.
- **Integrated with Git**: Seamless interaction with Git for streamlined commit workflows.


## Installation

To install the CLI tool globally, ensure you have Node.js installed, then run the following command:

```bash
npm install -g ai-cmd
```

## Usage

### Config Command

To configure the AI model run:

```bash
ai-cmd config
```

This will prompt you to select the AI model you want

### Commit Command

To automatically generate a commit message and commit changes:

```bash
ai-cmd commit
```

This will analyze the changes in your Git repository, generate a commit message using the selected AI model, and commit the changes.

**Example** generated commit message:

```
feat: Add user authentication to the application

- Implemented OAuth2 login flow.
- Added user session management.
- Fixed bugs related to session expiration.

Closes #123
```

## Future improvements:

- **Support for more AI models**: Expand support to other AI models beyond OpenAI, Claude, and Ollama.
- **Review process for code**: Implement a feature that allows the AI to review code changes and suggest improvements.
- **Image generation**: Add functionality for generating images or diagrams based on the project or commit context.

## LICENCE

MIT License

Copyright (c) 2024 alexiej

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
