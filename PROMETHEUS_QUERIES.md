# Queries Prometheus para Teste

## Métricas Disponíveis

### Métricas de Aplicação
- `total_users` - Número total de usuários
- `total_boards` - Número total de boards
- `total_lists` - Número total de listas
- `total_cards` - Número total de cards
- `cards_by_status{status="todo|in_progress|done"}` - Cards por status

### Métricas HTTP
- `http_requests_total{method, route, status}` - Total de requisições HTTP
- `http_request_duration_seconds{method, route, status_code}` - Duração das requisições (histograma)
- `http_request_duration_seconds_sum` - Soma da duração das requisições
- `http_request_duration_seconds_count` - Contagem de requisições
- `http_request_duration_seconds_bucket` - Buckets do histograma

### Métricas de Sistema (Default)
- `process_resident_memory_bytes` - Uso de memória
- `process_cpu_seconds_total` - Tempo de CPU
- `node_memory_*` - Métricas de memória do nó
- `node_cpu_*` - Métricas de CPU do nó

---

## Queries Úteis para Grafana/Prometheus

### 1. Taxa de Requisições por Segundo
```promql
rate(http_requests_total[5m])
```

### 2. Taxa de Requisições por Método
```promql
sum(rate(http_requests_total[5m])) by (method)
```

### 3. Taxa de Requisições por Rota
```promql
sum(rate(http_requests_total[5m])) by (route)
```

### 4. Latência P95 (95th Percentile)
```promql
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

### 5. Latência P50 (Mediana)
```promql
histogram_quantile(0.50, rate(http_request_duration_seconds_bucket[5m]))
```

### 6. Latência Média
```promql
rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])
```

### 7. Taxa de Erros 5xx
```promql
rate(http_requests_total{status=~"5.."}[5m])
```

### 8. Taxa de Erros 4xx
```promql
rate(http_requests_total{status=~"4.."}[5m])
```

### 9. Taxa de Erros (Total)
```promql
sum(rate(http_requests_total{status=~"4..|5.."}[5m]))
```

### 10. Taxa de Erros como Porcentagem
```promql
(rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])) * 100
```

### 11. Status Codes HTTP
```promql
sum(rate(http_requests_total[5m])) by (status)
```

### 12. Cards por Status
```promql
cards_by_status
```

### 13. Total de Cards
```promql
total_cards
```

### 14. Total de Boards
```promql
total_boards
```

### 15. Total de Usuários
```promql
total_users
```

### 16. Uso de Memória
```promql
process_resident_memory_bytes
```

### 17. Uso de CPU
```promql
rate(process_cpu_seconds_total[5m]) * 100
```

### 18. Requisições por Segundo com Labels
```promql
rate(http_requests_total[5m]) * on(method, route) group_left() http_requests_total
```

### 19. Top 5 Rotas Mais Acessadas
```promql
topk(5, sum(rate(http_requests_total[5m])) by (route))
```

### 20. Requisições com Erro por Rota
```promql
sum(rate(http_requests_total{status=~"4..|5.."}[5m])) by (route)
```

---

## Queries Avançadas

### Alerta de Alta Taxa de Erros
```promql
rate(http_requests_total{status=~"5.."}[5m]) > 0.1
```

### Alerta de Alta Latência
```promql
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1
```

### SLO de Disponibilidade (99.9%)
```promql
(
  sum(rate(http_requests_total{status!~"5.."}[5m]))
  /
  sum(rate(http_requests_total[5m]))
) * 100
```

### Taxa de Sucesso
```promql
sum(rate(http_requests_total{status=~"2.."}[5m])) / sum(rate(http_requests_total[5m]))
```

### Throughput por Minuto
```promql
sum(rate(http_requests_total[1m]))
```

---

## Como Testar no Prometheus UI

1. Acesse: http://localhost:9090
2. Clique na aba "Graph"
3. Cole uma das queries acima
4. Clique em "Execute"
5. Ajuste o range de tempo conforme necessário

---

## Exemplos de Uso no Dashboard

### Panel: Taxa de Requisições
```promql
rate(http_requests_total[5m])
```
Legend: `{{method}} {{route}}`

### Panel: Latência P95
```promql
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```
Legend: `95th percentile`

### Panel: Taxa de Erros
```promql
rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])
```
Legend: `Erro 5xx`

### Panel: Uso de Memória
```promql
process_resident_memory_bytes
```
Unit: bytes

### Panel: Uso de CPU
```promql
rate(process_cpu_seconds_total[5m]) * 100
```
Unit: percent
