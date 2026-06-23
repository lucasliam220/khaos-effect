# Khaos Effect - Title screen animada

## Arquivos

- `assets/title-screen/reference-final.png`: referencia visual. Nao e usada como tela cheia.
- `assets/title-screen/background.png`: background da title screen.
- `assets/title-screen/khaos-effect-logo.png`: logo independente.
- `assets/title-screen/animations.json`: contrato de animacoes e niveis de qualidade.
- `assets/title-screen/scene-layout.json`: posicoes normalizadas e profundidade.
- `src/khaos_effect_template.html`: implementacao da cena `s-cover`.
- `index.html`: build gerado.

## Animacoes disponiveis

- `logo_idle`: flutuacao do logo e brilho discreto.
- `press_start_pulse`: pulso do texto `PRESS START`.
- `red_dragon_fire`: rajada procedural do dragao vermelho.
- `purple_dragon_fire`: rajada procedural do dragao roxo.
- `mecha_core_idle`: feixe azul, pulsos e particulas.
- `portal_storm`: portal/raios roxos no ceu.
- `ogre_idle`: overlay ancorado de respiracao.
- `slime_idle`: overlays ancorados com squash/stretch.
- `environment_water`: brilhos discretos de agua e cachoeiras.

## Efeitos implementados

- Background em `cover`, sem deformacao.
- Canvas com `imageSmoothingEnabled = false`.
- Particulas prealocadas: brasas, fumaca, motes azuis, motes roxos, agua e esporos.
- Ataques dos dragoes em intervalos diferentes.
- Meteoro ocasional.
- Fade-out unico para `s-entry`.
- Inputs: Enter, espaco, clique, toque, botao principal e Start de gamepad.
- Suporte a `prefers-reduced-motion`.

## Fallbacks

O `background.png` ja contem a maioria das criaturas principais. Para evitar sprites inconsistentes, a build atual usa efeitos e overlays ancorados ao fundo em vez de duplicar corpos completos por cima da arte.

Precisam de revisao manual para virar sprite sheet real:

- recorte limpo do dragao vermelho;
- recorte limpo do dragao roxo;
- sprite sheet do castelo-mecha;
- sprite sheet do ogro;
- recorte do vampiro e coelho.

## Ajustar posicao e escala

Edite `assets/title-screen/scene-layout.json`.

- `position`: coordenadas normalizadas `[x, y]` entre `0` e `1`.
- `scale`: escala relativa.
- `depth`: ordem visual conceitual.
- `actionIntervalSeconds`: intervalo aleatorio de eventos especiais.
- `amplitude`: movimento maximo normalizado.

Depois rode:

```bash
npm run build
npm run validate
```

## Adicionar nova criatura

1. Adicione a entrada visual em `scene-layout.json`.
2. Registre a animacao em `animations.json`.
3. Se for procedural, adicione o desenho no objeto `TitleScene`.
4. Se for sprite sheet real, mantenha frames com mesma dimensao, origem e escala.
5. Revalide em desktop e mobile.
