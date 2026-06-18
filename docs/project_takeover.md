# Khaos Effect — Estado de projeto assumido

Data: 18/06/2026  
Responsavel tecnico atual: Codex

## Decisao

Assumo o projeto a partir do handoff fornecido, mas com uma ressalva importante: o arquivo da reconstrucao Supabase descrito no handoff nao foi encontrado nos arquivos locais disponiveis. O que existe no disco neste momento e o prototipo antigo/local, mais o handoff que descreve a reconstrucao desejada.

## Arquivos encontrados

- `C:\Users\lucas\Downloads\khaos_effect_handoff.md`
  - Handoff estrategico do projeto.
  - Descreve uma versao nova single-file com Supabase, lobby real e floresta pixel art animada.

- `C:\Users\lucas\Downloads\khaos_effect_game.html`
  - Single-file antigo com jogo completo.
  - Usa `localStorage`, nao Supabase.
  - Contem os dados canonicos embutidos em `const KE`.

- `C:\Users\lucas\Downloads\khaos_effect\`
  - Versao modular do prototipo antigo.
  - Contem `js/data.js`, que deve ser tratado como fonte canonica dos dados ate haver fonte mais nova.

Copias de trabalho foram trazidas para `work/`, sem alterar os originais em Downloads.

## Fonte canonica atual dos dados

Fonte assumida:

`work/khaos_effect_legacy/js/data.js`

Validacao feita:

| Item | Contagem |
|---|---:|
| Racas | 20 |
| Classes | 13 |
| Subclasses | 39 |
| Categorias de cartas | 18 |
| Cartas narrativas | 292 |

Classes encontradas:

1. Barbaro
2. Guerreiro
3. Mago
4. Clerigo
5. Ladino
6. Bardo
7. Paladino
8. Druida
9. Artifice
10. Feiticeiro
11. Necromante
12. Patrulheiro
13. Bruxo

Observacao: a classe secreta `Fourth Wall Mason`, citada no handoff, nao aparece literalmente no `data.js` nem no HTML antigo. Isso deve ser tratado como pendencia de reconciliacao, nao como autorizacao para inventar dados.

## Diagnostico tecnico

O handoff descreve uma versao alvo mais avancada:

- Supabase real com `khaos_rooms`, `khaos_players`, `khaos_characters`, etc.
- Identidade persistente por `player_key`.
- Criar/entrar/reconectar sala real.
- Lobby em tempo real.
- Proxima etapa: tela de criacao de personagem persistida em Supabase.

Os arquivos encontrados implementam outra realidade:

- Persistencia local via `localStorage`.
- Sala local, nao multiplayer real.
- Tela de jogo ja existe no prototipo antigo.
- Character builder antigo ja existe, mas salva localmente.
- Dados canonicos completos estao disponiveis.

Checks objetivos do `khaos_effect_game.html` encontrado:

| Check | Resultado |
|---|---|
| Tamanho | 479.399 bytes |
| Contem Supabase | Nao |
| Contem tabelas `khaos_*` | Nao |
| Ocorrencias de `localStorage` | 12 |
| Telas | `s-cover`, `s-login`, `s-lobby`, `s-char`, `s-game` |
| Contem `<symbol id="forestArt">` | Nao |
| Contem dados `const KE` | Sim |

Portanto, a estrategia correta e reconstruir a versao Supabase usando o handoff como arquitetura e o prototipo antigo como fonte de dados/comportamentos.

## Regras que vou seguir

- Nao criar, renomear ou remover racas/classes/subclasses/cartas sem pedido explicito do Lucas.
- Usar `data.js` antigo como fonte canonica ate receber outra fonte.
- Tratar `Fourth Wall Mason` como pendencia ate Lucas confirmar onde ela vive.
- Preservar o tom comico/acido e o idioma PT-BR.
- Manter Supabase via UMD, nao ESM.
- Manter o app resiliente se o JS ou CDN falhar parcialmente.
- Fazer entregas incrementais e testaveis, sem tentar portar o VTT inteiro de uma vez.

## Proximo incremento recomendado

Criar uma nova versao single-file de trabalho que una:

1. Fundacao Supabase descrita no handoff.
2. Dados canonicos do prototipo antigo.
3. Tela de criacao de personagem pixel art.
4. Persistencia em `khaos_characters`.
5. Vinculo do personagem em `khaos_players.character_id`.

Escopo fechado do primeiro incremento:

- Criar/entrar/reconectar sala.
- Lobby ao vivo.
- Iniciar sessao levando para criacao/selecionar personagem.
- Salvar personagem no Supabase.
- Reabrir navegador e recuperar personagem.
- Nao portar ainda mapa, tokens, iniciativa, cartas, chat completo ou painel do Mestre.

## Pendencias para Lucas confirmar depois

- Onde esta a versao Supabase ja pronta mencionada no handoff, se ela existir fora dos arquivos encontrados.
- Qual e a regra real da classe secreta `Fourth Wall Mason`.
- Se o projeto deve continuar como single-file permanente ou se aceita modularizacao depois que o MVP estiver estavel.
