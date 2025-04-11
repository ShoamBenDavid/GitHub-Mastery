export interface ExerciseStep {
  instruction: string;
  solution: string;
  validationCommand?: string;
}

export interface Exercise {
  id: string;
  question: string;
  description: string;
  hints: string[];
  solution: string;
  validationCommand?: string;
  isStepByStep?: boolean;
  steps?: ExerciseStep[];
}

export interface BranchNode {
  name: string;
  attributes?: {
    commit?: string;
    message?: string;
    timestamp?: string;
  };
  children?: BranchNode[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  exercises: Exercise[];
  prerequisites?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  visualization?: BranchNode | null;
}

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  exercisesCompleted: string[];
  lastAccessed: Date;
} 