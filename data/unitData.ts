import type { UnitContent } from "./types";

export const unitData: UnitContent = {
  unitNumber: "Módulo 4 · Unidade 3",
  unitTitle: "Construção de Agentes Inteligentes",
  unitSubtitle:
    "Memória, estado, orquestração e frameworks — com um agente completo construído passo a passo.",
  overview:
    "Depois de entender o que é um agente (U1) e como protegê-lo (U2), nesta unidade você descobre como ele é montado por dentro. Aprenda a gerenciar estado e checkpoints, controlar ruído na janela de contexto, usar grafos com ciclos controlados e escolher frameworks como LangGraph e AutoGen.",
  simulatorTitle: "Simulador de Orquestração em Grafo & Checkpoints",
  simulatorSubtitle:
    "Acompanhe passo a passo como um agente de reservas usa nós, checkpoints e replanejamento.",
  simulatorSteps: [
    {
      id: "entender",
      label: "1. Entender",
      shortDesc: "Extrai objetivo, datas e orçamento.",
      detail:
        "O usuário pede uma viagem para Recife no próximo fim de semana até R$ 1.200. O primeiro nó do grafo transforma o texto em parâmetros estruturados.",
      payload: `{
  "destino": "Recife",
  "orcamento_max": 1200,
  "estado": "OBJETIVO_DEFINIDO"
}`,
    },
    {
      id: "buscar",
      label: "2. Buscar e Filtrar",
      shortDesc: "Consulta opções e salva checkpoint.",
      detail:
        "O nó de busca consulta a API de voos e salva um checkpoint do estado. Se a conexão cair aqui, não é preciso recomeçar do zero.",
      payload: `{
  "checkpoint": "cp_02_busca",
  "opcoes_encontradas": 4,
  "filtradas_no_orcamento": 2
}`,
    },
    {
      id: "comparar",
      label: "3. Decidir / Replanejar",
      shortDesc: "Valida se atende aos critérios.",
      detail:
        "O nó de decisão compara horários e preços. Se o voo escolhido esgotar, uma aresta condicional faz o grafo voltar ao nó de busca com novo filtro.",
      payload: `{
  "melhor_opcao": "Voo 304 · R$ 980",
  "validacao": "DENTRO_DO_ORCAMENTO",
  "ciclo_replanejamento": 0
}`,
    },
    {
      id: "reservar",
      label: "4. Reservar (Idempotente)",
      shortDesc: "Executa reserva com chave única.",
      detail:
        "Com aprovação confirmada, o nó de reserva envia uma chave de idempotência para garantir que o assento não seja reservado duas vezes.",
      payload: `{
  "idempotency_key": "res_recife_8821",
  "status_reserva": "CONFIRMADA"
}`,
    },
    {
      id: "observar",
      label: "5. Observabilidade",
      shortDesc: "Registra métricas, tempo e custo.",
      detail:
        "Ao finalizar, o sistema grava o rastro completo (trace) para testes de regressão e controle de custo de tokens.",
      payload: `{
  "tempo_total": "2.4s",
  "tokens_usados": 1420,
  "status": "SUCESSO"
}`,
    },
  ],
  concepts: [
    {
      id: "u3c1",
      chapter: "Capítulo 1 · Fundamentos",
      title: "Autonomia Real vs. Autonomia Teatral",
      summary:
        "O que diferencia um agente pronto para uso real de uma demonstração ensaiada.",
      fromZero:
        "Autonomia teatral é aquele vídeo bonito que só funciona no exemplo ensaiado. Autonomia real é o sistema que aguenta pedidos confusos, falhas de internet e mudanças de rota sem quebrar.",
      inPractice:
        "Um agente real tem quatro marcas: objetivo explícito, decomposição em subtarefas, critérios claros de validação e continuidade lógica entre etapas.",
      attention:
        "Não confunda um prompt gigante com uma arquitetura de agente. Sem controle de estado, o sistema se perde em tarefas longas.",
      keyTakeaway:
        "Construir um agente é desenhar um processo confiável, não apenas escrever instruções bonitas.",
    },
    {
      id: "u3c2",
      chapter: "Capítulo 2 & 3 · Planejamento",
      title: "Decomposição, Decisões Intermediárias e Replanejamento",
      summary:
        "O limite saudável entre flexibilidade inteligente e improviso perigoso.",
      fromZero:
        "Em vez de tentar resolver tudo em uma única resposta, o agente quebra o objetivo em subtarefas dependentes (ex: primeiro buscar, depois filtrar, depois comparar) e checa cada etapa.",
      inPractice:
        "Se o passo 2 retornar 'nenhum resultado', o agente replaneja (ex: amplia a faixa de datas) dentro de critérios definidos, sem inventar dados.",
      attention:
        "Flexibilidade não é improviso: o agente deve ter critérios de validação para saber quando um passo deu certo ou falhou.",
      keyTakeaway:
        "Decompor + validar a cada passo evita que um erro inicial contamine todo o resultado.",
    },
    {
      id: "u3c3",
      chapter: "Capítulo 4 · Estado",
      title: "Estado, Execução Não Linear e Checkpoints",
      summary:
        "Como salvar o progresso para retomar exatamente de onde parou.",
      fromZero:
        "Estado é a 'fotografia' do trabalho até o momento. Checkpoint é como o ponto de salvamento de um videogame: se o servidor reiniciar ou o humano demorar horas para aprovar, o agente retoma do último checkpoint.",
      inPractice:
        "Em fluxos que exigem aprovação humana, o agente salva o estado no checkpoint, dorme sem gastar recursos e acorda assim que o humano aprova.",
      attention:
        "Sempre combine retomada de checkpoint com idempotência para não repetir pagamentos ou envios de e-mail.",
      keyTakeaway:
        "Checkpoints tornam agentes resilientes a falhas de rede e pausas humanas.",
    },
    {
      id: "u3c4",
      chapter: "Capítulo 5 & 6 · Memória e Contexto",
      title: "Controle da Janela de Contexto e Combate ao Ruído",
      summary:
        "Estratégias para manter o agente rápido, barato e preciso.",
      fromZero:
        "A janela de contexto é a 'memória de trabalho' do modelo. Se você acumular histórico antigo, logs gigantes e textos inúteis (ruído), o modelo fica lento, caro e propenso a errar.",
      inPractice:
        "Três estratégias que funcionam: 1) resumir mensagens antigas; 2) filtrar apenas campos essenciais das APIs; 3) buscar documentos sob demanda na memória externa.",
      attention:
        "Custo de tokens e latência devem ser tratados como métricas de projeto desde o primeiro dia.",
      keyTakeaway:
        "Menos ruído na janela de contexto significa mais inteligência e menor custo.",
    },
    {
      id: "u3c5",
      chapter: "Capítulo 7 · Arquitetura",
      title: "As 5 Camadas da Arquitetura de um Agente",
      summary:
        "Modelo, Orquestrador, Ferramentas, Memória e Controle de Estado.",
      fromZero:
        "Um agente de produção é montado em 5 camadas independentes: o Modelo (raciocínio), o Orquestrador (fluxo), as Ferramentas (APIs), a Memória (curto/longo prazo/externa) e o Controle de Estado (checkpoints).",
      inPractice:
        "Essa separação permite trocar o modelo de IA ou atualizar uma ferramenta sem precisar reescrever o sistema inteiro.",
      attention:
        "Misturar lógica de negócio, chamadas de banco e prompts em um único bloco torna a manutenção impossível.",
      keyTakeaway:
        "Arquitetura em camadas garante evolução segura e fácil manutenção.",
    },
    {
      id: "u3c6",
      chapter: "Capítulo 8 · Grafos",
      title: "Orquestração em Grafo: Nós, Arestas e Ciclos Controlados",
      summary:
        "Por que fluxos lineares não bastam para agentes inteligentes.",
      fromZero:
        "Um fluxo linear só anda para frente (A → B → C). Um grafo parece um mapa de metrô: tem Nós (ações/decisões) e Arestas (caminhos que podem voltar se precisar tentar de novo).",
      inPractice:
        "Se um texto gerado não passar na revisão de qualidade, o grafo segue a aresta de volta para o nó de reescrita — com um limite máximo de ciclos (ex: máximo 3 tentativas).",
      attention:
        "Todo ciclo em grafo precisa de um contador máximo de voltas para evitar loops infinitos.",
      keyTakeaway:
        "Grafos oferecem flexibilidade com trilhos claros e ciclos controlados.",
    },
    {
      id: "u3c7",
      chapter: "Capítulo 9 · Frameworks",
      title: "LangChain, LangGraph e AutoGen (2025–2026)",
      summary:
        "Como escolher o framework certo para o seu projeto.",
      fromZero:
        "Frameworks são caixas de peças prontas para não construir tudo do zero. LangChain facilita conexões rápidas; LangGraph é focado em grafos, estado e checkpoints; AutoGen facilita vários agentes conversando entre si.",
      inPractice:
        "Para fluxos simples e protótipos, comece enxuto. Para sistemas em produção que exigem retomada, aprovação humana e controle rigoroso de estado, grafos (como LangGraph) se destacam.",
      attention:
        "Frameworks evoluem rápido; foque em entender os conceitos de estado, grafo e contrato de ferramentas.",
      keyTakeaway:
        "Escolha o framework pela necessidade de controle e estado, nunca pela moda.",
    },
    {
      id: "u3c8",
      chapter: "Capítulo 10 · Qualidade",
      title: "Testes, Regressão e Observabilidade",
      summary:
        "Como garantir que o agente continua confiável após cada mudança.",
      fromZero:
        "Observabilidade é como a caixa-preta de um avião: permite ver exatamente qual caminho o agente seguiu, quanto tempo levou e onde falhou.",
      inPractice:
        "Crie um conjunto de casos de teste (incluindo pedidos difíceis) e rode testes de regressão sempre que mudar um prompt ou ferramenta.",
      attention:
        "Sem métricas e rastreamento, uma pequena mudança no prompt pode quebrar algo que já funcionava.",
      keyTakeaway:
        "Agente em produção exige testes contínuos e observabilidade de ponta a ponta.",
    },
  ],
  quiz: [
    {
      id: 1,
      question: "O que caracteriza a 'autonomia teatral' em um projeto de agente?",
      options: [
        "Um agente que funciona apenas na demonstração ensaiada e quebra no uso real.",
        "Um agente com checkpoints e testes automatizados.",
        "Um sistema que usa bancos de dados relacionais.",
        "Um agente com aprovação humana obrigatória.",
      ],
      correctIndex: 0,
      explanation:
        "Autonomia teatral parece impressionante no vídeo, mas não tem validação, estado nem tratamento de falhas.",
    },
    {
      id: 2,
      question: "Para que serve o 'Estado' na construção de um agente?",
      options: [
        "Para escolher a cor de fundo da página.",
        "Para guardar a fotografia atual da tarefa: o que já foi feito, dados coletados e próximo passo.",
        "Para apagar o banco de dados.",
        "Para substituir o modelo de linguagem.",
      ],
      correctIndex: 1,
      explanation:
        "Sem controle de estado, o agente perde o fio da meada em tarefas com várias etapas.",
    },
    {
      id: 3,
      question: "Qual é a função de um 'Checkpoint' em um fluxo de agente?",
      options: [
        "Aumentar o preço dos tokens.",
        "Salvar o progresso de cada etapa para permitir pausa e retomada exatamente de onde parou.",
        "Impedir o usuário de fazer perguntas.",
        "Reiniciar o computador automaticamente.",
      ],
      correctIndex: 1,
      explanation:
        "Checkpoints permitem pausar para aprovação humana ou recuperar falhas de rede sem perder o trabalho feito.",
    },
    {
      id: 4,
      question: "O que é 'ruído' na janela de contexto de um agente?",
      options: [
        "Barulho no microfone do professor.",
        "Excesso de informações antigas ou irrelevantes que deixam o agente mais lento, caro e confuso.",
        "Um tipo de cabo de rede.",
        "A senha do usuário.",
      ],
      correctIndex: 1,
      explanation:
        "Limpar e resumir o contexto melhora a precisão das decisões e reduz o custo.",
    },
    {
      id: 5,
      question: "Em uma orquestração em Grafo, o que são 'Nós' e 'Arestas'?",
      options: [
        "Nós são as etapas/ações e Arestas são os caminhos que conectam uma etapa à outra.",
        "Nós são erros e Arestas são senhas.",
        "São apenas nomes de cores em CSS.",
        "São tipos de memória RAM.",
      ],
      correctIndex: 0,
      explanation:
        "Grafos permitem caminhos condicionais e ciclos controlados entre nós de processamento.",
    },
    {
      id: 6,
      question: "Por que todo ciclo em um grafo precisa de um limite máximo de voltas?",
      options: [
        "Para o agente não ficar preso em um loop infinito gastando tempo e dinheiro.",
        "Porque grafos não aceitam números ímpares.",
        "Para desligar o monitor após 1 minuto.",
        "Não precisa de limite.",
      ],
      correctIndex: 0,
      explanation:
        "Ciclos controlados permitem tentar de novo quando há falha, mas com freio de segurança.",
    },
    {
      id: 7,
      question: "Qual framework é especialmente voltado para grafos, controle de estado e checkpoints?",
      options: [
        "LangGraph",
        "Paint",
        "Bloco de Notas",
        "Excel 97",
      ],
      correctIndex: 0,
      explanation:
        "O LangGraph modela fluxos de agentes como grafos com estado persistente e ciclos controlados.",
    },
    {
      id: 8,
      question: "Para que servem os testes de regressão em agentes?",
      options: [
        "Para voltar o sistema para o ano de 1990.",
        "Para garantir que uma alteração no prompt ou ferramenta não quebrou cenários que já funcionavam.",
        "Para apagar os logs antigos.",
        "Para criar imagens coloridas.",
      ],
      correctIndex: 1,
      explanation:
        "Como modelos de IA são sensíveis a mudanças de instrução, testes de regressão evitam surpresas em produção.",
    },
    {
      id: 9,
      question: "O que significa 'Observabilidade' em um sistema de agentes?",
      options: [
        "Enxergar por dentro cada passo, decisão, ferramenta chamada, tempo e custo do agente.",
        "Olhar para o teclado enquanto digita.",
        "Esconder os erros do usuário.",
        "Usar monitor de tela grande.",
      ],
      correctIndex: 0,
      explanation:
        "Observabilidade permite diagnosticar exatamente onde e por que o agente falhou.",
    },
    {
      id: 10,
      question: "Por que a etapa de reserva no estudo de caso usa 'idempotência'?",
      options: [
        "Para garantir que, se houver falha de rede e o agente tentar de novo, não faça duas reservas duplicadas.",
        "Para reservar o hotel mais caro.",
        "Para ignorar o orçamento do cliente.",
        "Para pular a etapa de busca.",
      ],
      correctIndex: 0,
      explanation:
        "A chave de idempotência protege ações críticas contra duplicação em novas tentativas.",
    },
  ],
  memoryPairs: [
    {
      id: "u3m1",
      term: "Estado",
      definition: "Fotografia atual da tarefa com dados coletados e etapa em andamento.",
    },
    {
      id: "u3m2",
      term: "Checkpoint",
      definition: "Ponto de salvamento que permite pausar e retomar sem perder progresso.",
    },
    {
      id: "u3m3",
      term: "Grafo (Nós/Arestas)",
      definition: "Estrutura que permite desvios condicionais e ciclos controlados.",
    },
    {
      id: "u3m4",
      term: "Ruído no Contexto",
      definition: "Dados inúteis na memória que aumentam custo e reduzem precisão.",
    },
    {
      id: "u3m5",
      term: "Observabilidade",
      definition: "Rastreamento completo de passos, latência e custo de cada execução.",
    },
    {
      id: "u3m6",
      term: "Teste de Regressão",
      definition: "Verificação para garantir que ajustes novos não quebraram o que funcionava.",
    },
  ],
};
