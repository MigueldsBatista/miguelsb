# Guia de Melhoria do Portfólio: Separando Experiências e Projetos

Este guia descreve como reestruturar seu portfólio para destacar suas experiências profissionais (estágios, monitorias) separadamente dos seus projetos pessoais, mantendo uma conexão inteligente entre eles.

## 1. Por que separar?

Atualmente, sites de portfólio modernos tendem a distinguir:
-   **Experiência (Timeline/Carreira):** Onde você trabalhou, seu cargo e responsabilidades. Foca no "quem" (empresa) e "quando".
-   **Projetos (Showcase):** O que você construiu. Foca no "o quê" (produto) e "como" (tecnologia).

Separar permite que recrutadores vejam rapidamente sua trajetória profissional ("Estagiou na Empresa X") e depois mergulhem nos detalhes técnicos dos projetos relacionados.

## 2. Nova Estrutura de Dados

Vamos criar uma nova fonte de dados para **Experiências** e atualizar a de **Projetos** para permitir o vínculo.

### 2.1. Criar Tipo `Experience`

Crie um arquivo `src/types/experience.ts`:

```typescript
export type ExperienceType = 'internship' | 'job' | 'monitorship' | 'freelance';

export interface Experience {
  id: number;
  role: string;          // Ex: "Estagiário de Desenvolvimento", "Monitor de Algoritmos"
  company: string;       // Ex: "Empresa X", "Universidade Y"
  type: ExperienceType;
  startDate: string;     // Ex: "2023-01"
  endDate?: string;      // "Presente" se undefined
  description: string;   // Breve resumo das responsabilidades
  skills: string[];      // Tecnologias usadas nesta experiência
  relatedProjectIds?: number[]; // IDs dos projetos desenvolvidos lá
}
```

### 2.2. Atualizar Tipo `Project`

Edite `src/types/project.ts` para permitir o caminho inverso (opcional, mas útil para mostrar "Feito na Empresa X" no card do projeto):

```typescript
export type Project = {
  // ... campos existentes
  experienceId?: number; // ID da experiência onde este projeto foi criado
};
```

### 2.3. Criar Dados de Experiência

Crie `src/data/experiences.ts`:

```typescript
import { Experience } from '@/types/experience';

export const experiences: Experience[] = [
  {
    id: 1,
    role: 'Estagiário Full Stack',
    company: 'Brencorp',
    type: 'internship',
    startDate: '2024-01',
    description: 'Atuação no desenvolvimento da plataforma Rec e Tec...',
    skills: ['Django', 'Vue', 'PostgreSQL'],
    relatedProjectIds: [3] // Linkando ao projeto "Rec e Tec" (ID 3 no seu projects.ts)
  },
  {
    id: 2,
    role: 'Monitor de Algoritmos',
    company: 'CESAR School',
    type: 'monitorship',
    startDate: '2023-02',
    endDate: '2023-12',
    description: 'Auxílio aos alunos na compreensão de estruturas de dados...',
    skills: ['C', 'Python', 'Estrutura de Dados']
  }
];
```

## 3. Implementação na Interface

Sugiro criar uma nova página ou seção dedicada a "Carreira" ou "Jornada".

### 3.1. Componente de Timeline (Recomendado)

Uma linha do tempo vertical funciona muito bem para experiências.

1.  Crie `src/components/experience/ExperienceTimeline.vue`.
2.  Itere sobre `experiences`.
3.  Use ícones diferentes para `internship` (maleta) e `monitorship` (livro/capelo).

### 3.2. Linkando com Projetos (A parte "Linkar em alguns momentos")

Dentro do card da experiência na timeline, você pode verificar se existem `relatedProjectIds`. Se houver, renderize "Chip" ou "Mini Card" que leva ao projeto.

**Exemplo de lógica (pseudo-código Vue):**

```vue
<template>
  <div class="experience-card">
    <h3>{{ experience.role }} @ {{ experience.company }}</h3>
    <p>{{ experience.description }}</p>

    <!-- Se houver projetos relacionados -->
    <div v-if="experience.relatedProjectIds" class="mt-4">
      <span class="text-sm font-bold text-gray-500">Projetos relacionados:</span>
      <div class="flex gap-2 mt-1">
        <RouterLink 
          v-for="projId in experience.relatedProjectIds" 
          :key="projId"
          :to="{ name: 'project-details', params: { id: projId } }"
          class="badge badge-primary"
        >
          {{ getProjectName(projId) }} <Icon name="external-link" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { projects } from '@/data/projects';

// Helper para pegar o nome do projeto pelo ID
const getProjectName = (id) => projects.find(p => p.id === id)?.name;
</script>
```

Dessa forma, a experiência de estágio fica rica, mostrando não só o que você fez (texto), mas o resultado concreto (link para o projeto Rec e Tec). Já as monitorias, que geralmente não têm um "projeto de software" associado, ficam sem links, apenas com a descrição das atividades.

## 4. Próximos Passos Sugeridos

1.  [ ] **Criar os arquivos de tipo e dados** conforme descrito acima.
2.  [ ] **Criar uma nova View** `ExperiencePage.vue` (ou adicionar seção na Home).
3.  [ ] **Implementar o componente de Timeline**.
4.  [ ] **Adicionar a lógica de relacionamento** nos cards.

Gostaria que eu começasse a implementar a estrutura de dados para você?
