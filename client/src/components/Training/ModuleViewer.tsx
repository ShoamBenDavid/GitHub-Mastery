import React, { useState, useEffect } from 'react';
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
import { Exercise, ExerciseStep } from '../../types/training';
import BranchVisualization from './BranchVisualization';

const ModuleViewer: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const module = trainingModules.find((m) => m.id === moduleId);

  const [activeStep, setActiveStep] = useState(0);
  const [showHints, setShowHints] = useState<boolean[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [stepAnswers, setStepAnswers] = useState<string[]>([]);
  const [currentExerciseStep, setCurrentExerciseStep] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [stepFeedback, setStepFeedback] = useState<Array<{ type: 'success' | 'error'; message: string } | null>>([]);

  // Reset state when moduleId changes
  useEffect(() => {
    setActiveStep(0);
    setUserAnswer('');
    setStepAnswers([]);
    setCurrentExerciseStep(0);
    setFeedback(null);
    setStepFeedback([]);
  }, [moduleId]);

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
      setStepAnswers([]);
      setCurrentExerciseStep(0);
      setFeedback(null);
      setStepFeedback([]);
    }
  };

  const handleNext = () => {
    if (activeStep < module.exercises.length) {
      setActiveStep((prev) => prev + 1);
      setUserAnswer('');
      setStepAnswers([]);
      setCurrentExerciseStep(0);
      setFeedback(null);
      setStepFeedback([]);
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

  const validateStepAnswer = (step: ExerciseStep, answer: string, stepIndex: number) => {
    // Check if the answer matches the solution for this step
    if (answer.trim() === step.solution.trim()) {
      setStepFeedback((prev) => {
        const newFeedback = [...prev];
        newFeedback[stepIndex] = {
          type: 'success',
          message: 'Correct! Proceed to the next step.',
        };
        return newFeedback;
      });
      return true;
    }
    
    setStepFeedback((prev) => {
      const newFeedback = [...prev];
      newFeedback[stepIndex] = {
        type: 'error',
        message: 'Not quite right. For this exercise, you need to use the exact command shown in the hint below.',
      };
      return newFeedback;
    });
    return false;
  };

  const handleStepNext = () => {
    const exercise = module.exercises[activeStep - 1];
    if (!exercise.steps || currentExerciseStep >= exercise.steps.length - 1) return;
    
    setCurrentExerciseStep((prev) => prev + 1);
  };

  // Find the index of the current module and the next module
  const currentModuleIndex = trainingModules.findIndex((m) => m.id === moduleId);
  
  // Find modules that have this module as a prerequisite
  const nextModulesByPrereq = trainingModules.filter(m => 
    m.prerequisites && m.prerequisites.includes(moduleId || '')
  );
  
  // If modules that have this as a prerequisite exist, use the first one
  // Otherwise, fall back to the next module in the array
  const nextModuleId = nextModulesByPrereq.length > 0 
    ? nextModulesByPrereq[0].id 
    : (currentModuleIndex < trainingModules.length - 1 
        ? trainingModules[currentModuleIndex + 1].id 
        : null);

  // Navigation functions
  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToNextModule = () => {
    if (nextModuleId) {
      navigate(`/training/${nextModuleId}`);
    } else {
      navigateToHome();
    }
  };

  const renderStepByStepExercise = (exercise: Exercise) => {
    if (!exercise.steps || exercise.steps.length === 0) return null;
    
    const currentStep = exercise.steps[currentExerciseStep];
    
    return (
      <Box>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          Step {currentExerciseStep + 1} of {exercise.steps.length}:
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          {currentStep.instruction}
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            value={stepAnswers[currentExerciseStep] || ''}
            onChange={(e) => {
              const newAnswers = [...stepAnswers];
              newAnswers[currentExerciseStep] = e.target.value;
              setStepAnswers(newAnswers);
            }}
            placeholder="Enter your Git command here..."
            variant="outlined"
            InputProps={{
              sx: {
                backgroundColor: '#010409', // Darker terminal background
                color: '#e6edf3', // Light terminal text
                fontFamily: '"Roboto Mono", "Consolas", monospace',
                '&::placeholder': {
                  color: '#8b949e',
                },
                '&:focus': {
                  borderColor: '#58a6ff',
                },
                '&::before': {
                  content: '"$ "',
                  color: '#f05133',
                  fontWeight: 'bold',
                  marginRight: '0.5rem',
                },
                padding: '12px',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#30363d',
                },
                '&:hover fieldset': {
                  borderColor: '#58a6ff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#58a6ff',
                },
              },
            }}
          />
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              onClick={() => validateStepAnswer(currentStep, stepAnswers[currentExerciseStep] || '', currentExerciseStep)}
              sx={{
                bgcolor: '#2ea44f',
                '&:hover': {
                  bgcolor: '#2c974b',
                },
              }}
            >
              Check Step
            </Button>
            
            {stepFeedback[currentExerciseStep]?.type === 'success' && currentExerciseStep < exercise.steps.length - 1 && (
              <Button
                variant="contained"
                color="success"
                onClick={handleStepNext}
              >
                Next Step
              </Button>
            )}
            
            {stepFeedback[currentExerciseStep]?.type === 'success' && currentExerciseStep === exercise.steps.length - 1 && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {activeStep < module.exercises.length ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleNext}
                    sx={{
                      bgcolor: '#2ea44f',
                      '&:hover': {
                        bgcolor: '#2c974b',
                      },
                    }}
                  >
                    Next Exercise
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={navigateToNextModule}
                    sx={{
                      bgcolor: '#2ea44f',
                      '&:hover': {
                        bgcolor: '#2c974b',
                      },
                    }}
                  >
                    {nextModuleId ? 
                      (nextModulesByPrereq.length > 0 ? 
                        `Complete & Start ${nextModulesByPrereq[0].title} Module` : 
                        'Complete Module & Start Next Module') : 
                      'Complete Module & Return Home'}
                  </Button>
                )}
                <Button
                  variant="outlined"
                  onClick={navigateToHome}
                  sx={{
                    borderColor: '#30363d',
                    color: '#c9d1d9',
                    '&:hover': {
                      borderColor: '#8b949e',
                      bgcolor: 'rgba(110, 118, 129, 0.1)',
                    },
                  }}
                >
                  Back to Home
                </Button>
              </Box>
            )}
          </Box>
          
          {/* Display exercise hints */}
          <Box sx={{ mt: 3, mb: 2 }}>
            {exercise.hints && exercise.hints.map((hint, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Button
                  startIcon={<HintIcon />}
                  onClick={() => toggleHint(index)}
                  size="small"
                >
                  Hint {index + 1}
                </Button>
                {showHints[index] && (
                  <Typography variant="body2" sx={{ 
                    ml: 4, 
                    mt: 1, 
                    p: 1.5, 
                    borderLeft: '3px solid #f05133',
                    bgcolor: 'rgba(240, 81, 51, 0.1)',
                    borderRadius: '0 4px 4px 0'
                  }}>
                    {hint}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
          
          {stepFeedback[currentExerciseStep] && (
            <Alert
              severity={stepFeedback[currentExerciseStep]?.type || 'info'}
              sx={{ mt: 2 }}
              action={
                stepFeedback[currentExerciseStep]?.type === 'success' && (
                  <CheckIcon color="success" />
                )
              }
            >
              {stepFeedback[currentExerciseStep]?.message}
            </Alert>
          )}
          
          {/* Show hint if error feedback exists */}
          {stepFeedback[currentExerciseStep]?.type === 'error' && (
            <Box sx={{ 
              mt: 2, 
              p: 2, 
              bgcolor: '#0d1117', 
              color: '#e6edf3',
              borderRadius: 1,
              border: '1px solid #30363d' 
            }}>
              <Typography variant="subtitle2" color="#58a6ff">
                Hint: Try using the exact command <code style={{ 
                  backgroundColor: '#161b22', 
                  padding: '0.2em 0.4em',
                  borderRadius: '3px' 
                }}>{currentStep.solution}</code>
              </Typography>
            </Box>
          )}
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle2" color="text.secondary">
          Progress: {currentExerciseStep + 1} of {exercise.steps.length} steps completed
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">{module.title}</Typography>
      </Box>

      <Stepper 
        activeStep={activeStep} 
        sx={{ 
          mb: 4,
          '& .MuiStepLabel-root .Mui-active': {
            color: '#f05133', // Git logo color for active step
          },
          '& .MuiStepLabel-root .Mui-completed': {
            color: '#2ea44f', // GitHub green for completed steps
          },
        }}
      >
        <Step key="content">
          <StepLabel>Content</StepLabel>
        </Step>
        {module.exercises.map((exercise, index) => (
          <Step key={exercise.id}>
            <StepLabel>Exercise {index + 1}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper 
        sx={{ 
          p: 4, 
          mb: 4, 
          border: '1px solid #30363d',
          boxShadow: '0 3px 6px rgba(149,157,165,0.15)',
          '& pre': {
            backgroundColor: '#0d1117',
            color: '#e6edf3',
            padding: 2,
            borderRadius: 1,
            fontFamily: '"Roboto Mono", "Consolas", monospace',
            overflow: 'auto',
          },
          '& code': {
            backgroundColor: '#0d1117',
            color: '#e6edf3',
            padding: '0.2em 0.4em',
            borderRadius: '3px',
            fontFamily: '"Roboto Mono", "Consolas", monospace',
          }
        }}
      >
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
            {module.exercises[activeStep - 1] ? (
              <>
                <Typography variant="h5" gutterBottom>
                  {module.exercises[activeStep - 1].question}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {module.exercises[activeStep - 1].description}
                </Typography>

                <Divider sx={{ my: 3 }} />

                {module.exercises[activeStep - 1] && module.exercises[activeStep - 1].isStepByStep ? (
                  renderStepByStepExercise(module.exercises[activeStep - 1])
                ) : (
                  <>
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
                        InputProps={{
                          sx: {
                            backgroundColor: '#010409', // Darker terminal background
                            color: '#e6edf3', // Light terminal text
                            fontFamily: '"Roboto Mono", "Consolas", monospace',
                            '&::placeholder': {
                              color: '#8b949e',
                            },
                            '&:focus': {
                              borderColor: '#58a6ff',
                            },
                            '&::before': {
                              content: '"$ "',
                              color: '#f05133',
                              fontWeight: 'bold',
                              marginRight: '0.5rem',
                            },
                            padding: '12px',
                          },
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#30363d',
                            },
                            '&:hover fieldset': {
                              borderColor: '#58a6ff',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#58a6ff',
                            },
                          },
                        }}
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
                            <Typography variant="body2" sx={{ 
                              ml: 4, 
                              mt: 1, 
                              p: 1.5, 
                              borderLeft: '3px solid #f05133',
                              bgcolor: 'rgba(240, 81, 51, 0.1)',
                              borderRadius: '0 4px 4px 0'
                            }}>
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
                  </>
                )}
              </>
            ) : (
              <Typography variant="h5">
                Exercise not found. Please go back and select a different exercise.
              </Typography>
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
            {module.exercises[activeStep - 1] && !module.exercises[activeStep - 1].isStepByStep && (
              <>
                <Button
                  variant="contained"
                  onClick={() => validateAnswer(module.exercises[activeStep - 1])}
                  sx={{ mr: 2 }}
                >
                  Check Answer
                </Button>
                {feedback?.type === 'success' && (
                  <>
                    {activeStep < module.exercises.length ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleNext}
                        sx={{
                          bgcolor: '#2ea44f',
                          '&:hover': {
                            bgcolor: '#2c974b',
                          },
                        }}
                      >
                        Next Exercise
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={navigateToNextModule}
                        sx={{
                          bgcolor: '#2ea44f',
                          '&:hover': {
                            bgcolor: '#2c974b',
                          },
                        }}
                      >
                        {nextModuleId ? 
                          (nextModulesByPrereq.length > 0 ? 
                            `Complete & Start ${nextModulesByPrereq[0].title} Module` : 
                            'Complete Module & Start Next Module') : 
                          'Complete Module & Return Home'}
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      onClick={navigateToHome}
                      sx={{
                        borderColor: '#30363d',
                        color: '#c9d1d9',
                        '&:hover': {
                          borderColor: '#8b949e',
                          bgcolor: 'rgba(110, 118, 129, 0.1)',
                        },
                      }}
                    >
                      Back to Home
                    </Button>
                  </>
                )}
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ModuleViewer; 