import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Alert,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  LightbulbOutlined as HintIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { trainingModules } from '../../data/trainingModules';
import { Exercise } from '../../types/training';
import BranchVisualization from './BranchVisualization';

const ModuleViewer: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const module = trainingModules.find((m) => m.id === moduleId);

  const [activeStep, setActiveStep] = useState(0);
  const [showHints, setShowHints] = useState<boolean[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!module) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4">Module not found</Typography>
      </Box>
    );
  }

  const handleBack = () => {
    if (activeStep === 0) {
      navigate('/training');
    } else {
      setActiveStep((prev) => prev - 1);
      setUserAnswer('');
      setFeedback(null);
    }
  };

  const handleNext = () => {
    if (activeStep < module.exercises.length) {
      setActiveStep((prev) => prev + 1);
      setUserAnswer('');
      setFeedback(null);
    }
  };

  const toggleHint = (index: number) => {
    setShowHints((prev) => {
      const newHints = [...prev];
      newHints[index] = !newHints[index];
      return newHints;
    });
  };

  const validateAnswer = (exercise: Exercise) => {
    // In a real implementation, this would run the validation command
    // For now, we'll just check if the answer matches the solution
    if (userAnswer.trim() === exercise.solution.trim()) {
      setFeedback({
        type: 'success',
        message: 'Correct! Well done!',
      });
      return true;
    }
    setFeedback({
      type: 'error',
      message: 'Not quite right. Try again or check the hints for help.',
    });
    return false;
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">{module.title}</Typography>
      </Box>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        <Step key="content">
          <StepLabel>Content</StepLabel>
        </Step>
        {module.exercises.map((exercise, index) => (
          <Step key={exercise.id}>
            <StepLabel>Exercise {index + 1}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 4, mb: 4 }}>
        {activeStep === 0 ? (
          <Box>
            <ReactMarkdown>{module.content}</ReactMarkdown>
            {module.visualization && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Branch Visualization
                </Typography>
                <BranchVisualization initialData={module.visualization} />
              </Box>
            )}
          </Box>
        ) : (
          <Box>
            <Typography variant="h5" gutterBottom>
              {module.exercises[activeStep - 1].question}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {module.exercises[activeStep - 1].description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Your Answer:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your Git command here..."
                variant="outlined"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              {module.exercises[activeStep - 1].hints.map((hint, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Button
                    startIcon={<HintIcon />}
                    onClick={() => toggleHint(index)}
                    size="small"
                  >
                    Hint {index + 1}
                  </Button>
                  {showHints[index] && (
                    <Typography variant="body2" sx={{ ml: 4, mt: 1 }}>
                      {hint}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>

            {feedback && (
              <Alert
                severity={feedback.type}
                sx={{ mb: 3 }}
                action={
                  feedback.type === 'success' && (
                    <CheckIcon color="success" />
                  )
                }
              >
                {feedback.message}
              </Alert>
            )}
          </Box>
        )}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
          {activeStep === 0 ? 'Back to Modules' : 'Previous'}
        </Button>
        {activeStep === 0 ? (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === module.exercises.length}
          >
            Start Exercises
          </Button>
        ) : (
          <Box>
            <Button
              variant="contained"
              onClick={() => validateAnswer(module.exercises[activeStep - 1])}
              sx={{ mr: 2 }}
            >
              Check Answer
            </Button>
            {feedback?.type === 'success' && (
              <Button
                variant="contained"
                color="success"
                onClick={handleNext}
                disabled={activeStep === module.exercises.length}
              >
                Next Exercise
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ModuleViewer; 