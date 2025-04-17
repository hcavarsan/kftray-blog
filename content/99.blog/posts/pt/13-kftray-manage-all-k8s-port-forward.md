---
layout: post
title: Gerencie seus port-forwards do Kubernetes em um só lugar com kftray
description: Conheça o kftray, uma ferramenta com interface gráfica (GUI) e de terminal (TUI) para gerenciar port-forwards TCP e UDP do Kubernetes, incluindo seu tratamento de conexões, a função de proxy e como compartilhar configurações pelo GitHub.
image: /img/cover6.png
timestamp: 1744905363
author: Henrique Cavarsan
position: Mantenedor
avatar: https://avatars.githubusercontent.com/u/30353685?v=4
avatarLink: https://github.com/hcavarsan
published: true
---

> **Aviso:** Sendo direto: o `kftray` talvez não seja para você. Se você só usa o `kubectl port-forward` ocasionalmente para conexões TCP simples e não se preocupa com quedas de conexão ou múltiplos terminais abertos, instalar o `kftray` pode ser uma complicação desnecessária. O comando `kubectl` padrão provavelmente resolve sua necessidade. No entanto, se você precisa de conexões mais estáveis, suporte a UDP, capacidade de proxy, ou uma forma melhor de organizar vários forwards, aí sim o `kftray` pode ser útil para essas tarefas.

kubectl port-forward é a ferramenta padrão e funciona para conexões TCP, mas pode se tornar inconveniente. Gerenciar muitos forwards exige lidar com muitos terminais, o comando não suporta UDP, e as vezes pode acontecer de cair a conexão apenas porque um pod reiniciou.

É basicamente para isso que o `kftray` existe. É uma ferramenta projetada para gerenciar esses port-forwards de forma mais simples. Ele roda em segundo plano, geralmente acessível pelo menu bar do sistema (system tray), e oferece um ponto central para gerenciar suas conexões. Em vez de executar comandos `kubectl` manualmente para cada forward, você os define uma única vez no `kftray`.

Para quem se interessa pela stack: o `kftray` utiliza Rust no backend, TypeScript com React para a interface gráfica (GUI, com Tauri), e Rust novamente com o framework Ratatui para a interface de terminal (`kftui`).

> O `kftray` roda inteiramente na sua máquina e não coleta dados de telemetria (como Sentry ou Google Analytics).


## O método padrão com `kubectl port-forward`

Antes de explicar o `kftray`, vamos relembrar rapidamente como funciona o `kubectl port-forward`. Normalmente, você abre um terminal e executa algo como `kubectl port-forward service/meu-servico 8080:80`. Precisa de outro forward? Abre outro terminal, executa outro comando. Precisa de cinco? São cinco terminais, cada um mantendo um túnel ativo.

Isso funciona, mas tem alguns pontos negativos conhecidos:
*   **Excesso de terminais:** Gerenciar muitas janelas de terminal apenas para port-forwards torna-se confuso.
*   **Sem suporte a UDP:** O `kubectl port-forward` nativo lida primariamente com TCP. Transmitir tráfego UDP costuma ser complexo ou inviável.
*   **Quedas de conexão:** Se o pod específico ao qual o forward está conectado reiniciar ou for reagendado pelo Kubernetes, sua conexão é interrompida. Você precisa então reiniciar manualmente o comando `kubectl`.
*   **Gerenciamento manual:** Lembrar qual comando corresponde a qual serviço, especialmente entre diferentes projetos ou contextos, depende inteiramente de você.

São esses tipos de inconvenientes que o `kftray` visa simplificar.

## Interface Gráfica (GUI) e Terminal (TUI)

É possível interagir com o `kftray` de duas maneiras. A forma padrão é através de um aplicativo gráfico (`kftray`) - com janelas e botões, acessível pelo ícone na bandeja do sistema. Contudo, se você prefere trabalhar no terminal ou precisa gerenciar forwards via SSH, existe também o `kftui`. Ele oferece uma interface de usuário completa no terminal (TUI) que permite realizar as mesmas tarefas principais: listar configurações, iniciar/parar forwards, importar configurações, etc., tudo diretamente no terminal. Tanto o `kftray` quanto o `kftui` usam o mesmo motor e dados de configuração, permitindo que você escolha a interface que melhor se adapta ao seu fluxo de trabalho.


![KFtui Demo](/img/kftools.webp)

[Post sobre o kftui](https://kftray.app/blog/posts/7-kftui-port-forward)


## Como usar no dia a dia

Para configurar um forward, você informa ao `kftray` os detalhes habituais: qual contexto Kubernetes usar (do seu kubeconfig padrão ou um customizado), o namespace do Kubernetes, o nome do serviço (ou um label específico do pod) que deseja alcançar, a porta que o serviço usa dentro do Kubernetes (ex: 8080), a porta local que deseja usar na sua máquina (ex: 9000), e, opcionalmente, um `local_address` específico em vez do padrão `127.0.0.1`. Definir um nome (alias) ajuda na organização quando há várias configurações. Você também indica se é um forward padrão (serviço/pod) ou se necessita de proxy (veremos mais sobre isso adiante).

Todas as configurações salvas aparecem na lista do aplicativo. A partir dela, é simples ativar ou desativar os port-forwards com um clique. Se precisar conectar múltiplos serviços para seu projeto, frequentemente é possível iniciá-los todos de uma vez.

![Adicionando Configuração (GUI)](/img/adding-config.gif)

## Apresentando o `kftray-server`

Para funcionalidades além do port-forwarding TCP básico (como lidar com tráfego UDP ou fazer proxy para destinos fora do cluster), o `kftray` utiliza um componente chamado `kftray-server`. Trata-se de uma pequena aplicação que funciona como um relay (retransmissor) ou ponte dentro do seu cluster Kubernetes.

Em vez de exigir a instalação manual desse servidor, o `kftray` (GUI ou TUI) gerencia isso automaticamente. Sempre que você inicia um forward do tipo UDP ou proxy, o `kftray` usa um modelo de manifesto (`~/.kftray/proxy_manifest.json`) para criar uma nova instância do pod `kftray-server` no namespace especificado. (Se precisar customizar a definição do pod, como ajustar limites de recursos ou adicionar tolerations, pode modificar o arquivo `proxy_manifest.json` antes de iniciar o forward.) Esse pod existe apenas enquanto o forward correspondente estiver ativo.

O modelo do manifesto se assemelha a isto (o aplicativo preenche os valores como portas, endereços e um nome único para cada configuração):

```json
{
  "apiVersion": "v1",
  "kind": "Pod",
  "metadata": {
    "name": "{hashed_name}",
    "labels": {
      "app": "{hashed_name}",
      "config_id": "{config_id}"
    }
  },
  "spec": {
    "containers": [
      {
        "name": "{hashed_name}",
        "image": "ghcr.io/hcavarsan/kftray-server:latest",
        "env": [
          {
            "name": "LOCAL_PORT",
            "value": "{local_port}"
          },
          {
            "name": "REMOTE_PORT",
            "value": "{remote_port}"
          },
          {
            "name": "REMOTE_ADDRESS",
            "value": "{remote_address}"
          },
          {
            "name": "PROXY_TYPE",
            "value": "{protocol}"
          },
          {
            "name": "RUST_LOG",
            "value": "DEBUG"
          }
        ],
        "resources": {
          "limits": {
            "cpu": "100m",
            "memory": "200Mi"
          },
          "requests": {
            "cpu": "100m",
            "memory": "100Mi"
          }
        }
      }
    ]
  }
}
```

Esse método de criação sob demanda significa que você não precisa instalar ou gerenciar o `kftray-server` previamente; o próprio `kftray` cuida de criar e remover o pod conforme necessário para cada conexão UDP/proxy.

[Detalhes da arquitetura do kftray-server](https://github.com/hcavarsan/kftray/blob/main/docs/ARCH.md)

## Como funciona o forward UDP

O port-forwarding padrão do Kubernetes não lida bem com tráfego UDP. O `kftray` soluciona isso usando o pod `kftray-server`. Ao configurar um forward UDP no `kftray`:


A ferramenta abre a porta UDP especificada em sua máquina local e estabelece um port-forward *TCP* padrão até o pod `kftray-server` no cluster. Quando sua aplicação local envia um pacote UDP para essa porta, o `kftray` encapsula o pacote dentro do túnel TCP até o `kftray-server`. O servidor então desencapsula o pacote UDP original e o encaminha para o serviço de destino dentro do cluster. A resposta segue o caminho inverso: UDP do serviço para o servidor, encapsulada em TCP de volta para o `kftray`, e finalmente entregue como UDP à sua aplicação local.


<Mermaid>
sequenceDiagram
    App->>Cliente kftray: Pacote UDP (para porta local)
    Cliente kftray->>kftray-server (no K8s): UDP sobre túnel TCP (via K8s port-forward)
    Note over kftray-server (no K8s): Desencapsula UDP
    kftray-server (no K8s)->>Serviço UDP Alvo: Pacote UDP
    Serviço UDP Alvo-->>kftray-server (no K8s): Resposta UDP
    Note over kftray-server (no K8s): Encapsula UDP em TCP
    kftray-server (no K8s)-->>Cliente kftray: Resposta UDP sobre túnel TCP
    Note over Cliente kftray: Desencapsula UDP
    Cliente kftray-->>App: Resposta UDP (da porta local)
</Mermaid>

Resumindo: o `kftray-server` transporta o tráfego UDP através de um túnel TCP seguro, utilizando o port-forward padrão do kubectl.

## Usando o `kftray-server` como proxy

O `kftray-server` também é utilizado no modo "proxy". Este modo permite conectar sua máquina, através do cluster Kubernetes, a um destino que está *fora* do K8s, mas que é acessível pela rede do cluster (como um banco de dados em uma rede privada).

<!-- Placeholder: Talvez uma imagem/gif mostrando os campos de configuração para um forward proxy -->
<!-- ![GUI Config Proxy](/img/proxy-config-gui-placeholder.gif) -->

Ao configurar um proxy no `kftray` (como o `private-redis-proxy` do exemplo JSON), você especifica o endereço e a porta do destino final (ex: `meu-redis-privado.interno:6379`) e o namespace onde o `kftray-server` será executado. O `kftray` em sua máquina conecta-se ao pod `kftray-server` (usando um port-forward TCP padrão), e o `kftray-server` retransmite o tráfego para esse destino final externo. Ele funciona como um ponto de acesso seguro, aproveitando o acesso à rede que o cluster possui. Isso é válido tanto para proxy TCP quanto UDP.


<Mermaid>
sequenceDiagram
    App Local->>Cliente kftray: Dados (ex: comando Redis)
    Cliente kftray->>kftray-server (no K8s): Dados via K8s port-forward (túnel TCP)
    Note over kftray-server (no K8s): Retransmitindo conexão
    kftray-server (no K8s)->>Redis Privado (Fora K8s): Dados para Redis externo
    Redis Privado (Fora K8s)-->>kftray-server (no K8s): Resposta Redis
    Note over kftray-server (no K8s): Retransmitindo resposta
    kftray-server (no K8s)-->>Cliente kftray: Resposta via K8s port-forward
    Cliente kftray-->>App Local: Dados de resposta
</Mermaid>


## Gerenciando configurações locais (em JSON)

O `kftray` possui funções para gerenciar as configurações. Elas são salvas localmente (geralmente em um arquivo SQLite em `~/.kftray/configs.db`), garantindo que persistam entre reinicializações do aplicativo.

Veja um exemplo do formato JSON, mostrando os tipos de configuração suportados pelo `kftray`:

```json
[
 {
   "alias": "web-frontend-svc", // Nome descritivo para esta configuração
   "context": "dev-cluster",    // Contexto K8s a ser usado (do kubeconfig)
   "kubeconfig": "~/.kube/config", // Caminho para o kubeconfig (opcional, usa o padrão se omitido)
   "local_port": 8080,          // Porta a ser usada na sua máquina local
   "namespace": "webapp",       // Namespace K8s do serviço/pod alvo
   "protocol": "tcp",           // Protocolo (tcp ou udp)
   "remote_port": 80,           // Porta que o serviço/pod utiliza dentro do K8s
   "service": "frontend-service", // Nome do serviço K8s alvo
   "workload_type": "service",  // Tipo (service, pod, ou proxy)
   "domain_enabled": true       // Se true, tenta adicionar o alias no /etc/hosts (ex: web-frontend-svc.kftray)
 },
 {
   "alias": "auth-api-pod",     // Alias para esta configuração
   "context": "dev-cluster",    // Contexto K8s
   "local_address": "127.0.0.2", // Endereço IP local específico (padrão: 127.0.0.1)
   "local_port": 9001,          // Porta local
   "namespace": "backend",      // Namespace K8s
   "protocol": "tcp",           // Protocolo
   "remote_port": 8080,         // Porta no(s) pod(s) alvo(s)
   "target": "app=auth",        // Label para encontrar o(s) pod(s) alvo(s)
   "workload_type": "pod"       // Acessando pods diretamente pela label
 },
 {
   "alias": "cluster-dns-udp",  // Alias
   "context": "prod-cluster",   // Contexto K8s
   "local_port": 5353,          // Porta local
   "namespace": "kftray-relay", // Namespace onde o pod kftray-server será criado para UDP
   "protocol": "udp",           // Protocolo UDP
   "remote_port": 53,           // Porta no serviço alvo (kube-dns)
   "service": "kube-dns",       // Nome do serviço K8s alvo
   "workload_type": "service"     // Ainda é um serviço, mas gerenciado pelo kftray-server por ser UDP
 },
 {
   "alias": "private-redis-proxy", // Alias
   "context": "prod-cluster",   // Contexto K8s
   "local_port": 6379,          // Porta local
   "namespace": "kftray-relay", // Namespace onde o pod kftray-server será criado para o proxy
   "protocol": "tcp",           // Protocolo da conexão proxy (tcp ou udp)
   "remote_address": "redis-master.internal-db.private", // O endereço final (fora do K8s, mas acessível pelo cluster)
   "remote_port": 6379,         // Porta do endereço final
   "workload_type": "proxy"     // Tipo é proxy, utiliza o kftray-server
 }
]
```

## Importar configurações automaticamente (via annotations)

Outra forma de gerenciar as configurações é através do recurso "auto import", que utiliza annotations do Kubernetes. São metadados que você adiciona às definições dos seus serviços no Kubernetes. É necessário incluir a annotation obrigatória `kftray.app/enabled=true` no manifesto do serviço. Opcionalmente, pode-se personalizar os detalhes da configuração importada com `kftray.app/configs="${config.alias}-${config.local_port}-${config.target_port}"` (o formato pode ser ajustado). Adicione essas annotations diretamente no arquivo YAML dos seus serviços Kubernetes.

Para iniciar a varredura, acesse o menu principal do `kftray` (GUI), selecione "auto import", escolha o kubeconfig e o contexto que deseja escanear e clique para importar. O `kftray` então escaneará o cluster, buscará os serviços com essas annotations e criará as configurações de port-forward correspondentes automaticamente. Este método associa o requisito de forward diretamente à definição do serviço, o que é conveniente ao usar ferramentas como Helm ou Terraform para gerenciar recursos no K8s.

Por exemplo, com esta definição de serviço:

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    kftray.app/configs: grafana-13080-3000
    kftray.app/enabled: "true"
  name: grafana
  namespace: monitoring
spec:
  # ... demais configurações do serviço
```



Ao executar a auto-importação para este contexto, o `kftray` cria uma configuração para o serviço `grafana` no namespace `monitoring`, utilizando o alias `grafana` (derivado do nome do serviço), mapeando a porta local `13080` para a porta `3000` do serviço, conforme o formato da annotation `${config.alias}-${config.local_port}-${config.target_port}`.

[Post sobre auto import](https://kftray.app/blog/posts/8-kubectl-port-forward-auto-import)

![Auto Import (Annotation)](/img/auto-import-gui.gif)




## Importar e Exportar Configurações

Você também pode exportar facilmente todas as suas configurações atuais para um arquivo JSON, seja para backup ou para compartilhar com outra pessoa. Da mesma forma, é possível importar configurações a partir de um arquivo JSON. Isso facilita a transferência de configurações entre máquinas ou a restauração de um backup.

<![Importar/Exportar (GUI)](/img/export-import.gif)


## Sincronizar configurações com Git

A exportação/importação local é útil, mas para compartilhar configurações, especialmente em equipe, uma abordagem automatizada é preferível. O `kftray` oferece integração com Git para isso, utilizando o mesmo formato JSON mencionado anteriormente.

<![Sincronizar com Git](/img/git-sync.gif)

Após configurar a sincronização com Git, você pode instruir o `kftray` a verificar o repositório periodicamente (ex: a cada 5 minutos). Se detectar alterações no arquivo JSON compartilhado, ele busca as atualizações automaticamente e as aplica às suas configurações locais. Isso mantém toda a equipe sincronizada com as configurações de port-forward padrão mais recentes, de forma automática.

## Acessar forwards por nome (hostname)

Além de acessar os serviços via `localhost:<porta_local>`, o `kftray` oferece a opção de usar nomes (hostnames) mais descritivos. Se você definir `"domain_enabled": true` em uma configuração (como no exemplo JSON), o `kftray` tentará adicionar uma entrada ao arquivo `/etc/hosts` do seu sistema quando o forward estiver ativo.

<video controls>
  <source src="https://github.com/user-attachments/assets/937357c0-fbaa-4ae6-9e86-2d82bccd335d" type="video/mp4">
</video>

Essa entrada geralmente mapeia o IP `127.0.0.1` a um hostname derivado do alias da configuração, como `web-frontend-svc.kftray` (usando o alias do exemplo). Isso permite acessar o serviço no navegador ou aplicação usando `http://web-frontend-svc:8080` em vez de `http://localhost:8080`, o que pode ser útil para evitar conflitos de cookies ou simular diferentes ambientes de host localmente.

*Observação:* Atualmente, para que este recurso funcione, o `kftray` precisa de permissão de escrita no arquivo `/etc/hosts`. Isso pode exigir que você execute o `kftray` com privilégios elevados (`sudo`) ou ajuste manualmente as permissões do `/etc/hosts`. Esta não é a abordagem ideal em termos de segurança, e planeja-se encontrar uma solução melhor e menos intrusiva para a resolução de hostnames locais futuramente.

## Usando IPs locais diferentes

Por padrão, o `kftray` utiliza o endereço de loopback padrão `127.0.0.1` para os port forwards. Contudo, você pode especificar um endereço diferente através do campo `local_address` na configuração, como no exemplo JSON (`"local_address": "127.0.0.2"`).

Isso pode ser útil para isolar serviços ou evitar conflitos de porta localmente. Se você utilizar um endereço de loopback diferente de `127.0.0.1`, o kftray criará um alias para ele automaticamente na interface de loopback.


## Inspecionando o tráfego HTTP

Durante o desenvolvimento, especialmente ao trabalhar com APIs (acessadas diretamente ou via proxy), pode ser necessário inspecionar as requisições e respostas HTTP que trafegam pelo port-forward. O `kftray` oferece uma opção para isso.

O processo é simples: localize a configuração na lista do `kftray` (GUI), clique no menu correspondente e selecione "enable http traffic logging". Após ativar o forward e realizar algumas requisições, clique no ícone de log que aparecerá na linha da configuração. Isso abrirá o arquivo de log gerado (localizado em `~/.kftray/http_logs/`) no seu editor de texto padrão.

Esses arquivos de log são formatados para serem compatíveis com a popular [extensão REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) do Visual Studio Code. Ao abrir o log no VS Code com essa extensão, você não apenas visualizará das interações capturadas (cabeçalhos, corpo da mensagem, status, tempo) – será possível clicar em um link "Send Request" acima de cada requisição registrada para reenviá-la instantaneamente. Isso é extremamente útil para depuração, permitindo ajustar e reenviar requisições diretamente do arquivo de log, sem a necessidade de reconstruir comandos `curl` ou outras configurações de cliente manualmente.

[Post sobre isso](https://kftray.app/blog/posts/12-kftray-http-logs-vscode)

![Demo do Log HTTP](/img/http-logs-vscode.gif)

## Resumo

Este foi um panorama geral do `kftray`. É uma ferramenta focada em gerenciar port-forwards do Kubernetes no contexto de desenvolvimento. Ele lida com conexões TCP diretamente via API para maior estabilidade e utiliza um pod auxiliar, o `kftray-server`, dentro do cluster para habilitar forward UDP e proxy para destinos externos. Ele integra funcionalidades como gerenciamento centralizado, opções de compartilhamento de configurações (importação/exportação JSON local, sincronização Git, annotations) e log HTTP. Com interfaces GUI e de terminal, busca atender a diferentes fluxos de trabalho. O objetivo principal é tornar a tarefa comum de conectar-se a serviços dentro ou *através* do Kubernetes durante o desenvolvimento um pouco menos manual e mais confiável. Foi desenvolvido pensando no ciclo de desenvolvimento (dev loop), não para uso em redes de produção.

Se você se interessou e quer saber mais:


-  [kftray.app](https://kftray.app/)
-  [github](https://github.com/hcavarsan/kftray)
-  [downloads](https://kftray.app/downloads)

Como o `kftray` é um projeto open-source desenvolvido no meu tempo livre, se você o considerar útil, por favor, considere dar uma estrela no [repositório do GitHub](https://github.com/hcavarsan/kftray)! Isso ajuda bastante a motivar a continuidade do desenvolvimento.

Obrigado!