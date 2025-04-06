import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Module } from '../../types/training';
import { trainingModules } from '../../data/trainingModules';

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'success';
    case 'intermediate':
      return 'warning';
    case 'advanced':
      return 'error';
    default:
      return 'default';
  }
};

const ModuleList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Training Modules
      </Typography>
      <Grid container spacing={3}>
        {trainingModules.map((module) => (
          <Grid item xs={12} md={6} lg={4} key={module.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {module.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, minHeight: '3em' }}
                >
                  {module.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={`${module.difficulty}`}
                    color={getDifficultyColor(module.difficulty) as any}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={module.estimatedTime}
                    variant="outlined"
                    size="small"
                  />
                </Box>
                {module.prerequisites && module.prerequisites.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Prerequisites:
                    </Typography>
                    {module.prerequisites.map((prereq) => (
                      <Chip
                        key={prereq}
                        label={
                          trainingModules.find((m) => m.id === prereq)?.title ||
                          prereq
                        }
                        size="small"
                        variant="outlined"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                )}
                <Box sx={{ mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={0}
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    0% Complete
                  </Typography>
                </Box>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/training/${module.id}`)}
                >
                  Start Module
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ModuleList; 