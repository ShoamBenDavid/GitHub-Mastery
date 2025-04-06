import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Container,
  useTheme,
  Paper,
  CardContent,
  Divider
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Chat as ChatIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import GuidedButton from '../../components/Common/GuidedButton';
import { useAuth } from '../../context/AuthContext';

const Home: React.FC = () => {
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleFeatureClick = (path: string) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: path } } });
    } else {
      navigate(path);
    }
  };

  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Tutorials',
      description: 'Learn Git through step-by-step interactive tutorials designed for all skill levels',
      path: '/training',
      color: '#bbdefb', // light blue
    },
    {
      icon: <AssignmentIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
      title: 'Practice Exercises',
      description: 'Reinforce your learning with hands-on exercises and real-world scenarios',
      path: '/training',
      color: '#f8bbd0', // light pink
    },
    {
      icon: <ChatIcon sx={{ fontSize: 48, color: 'success.main' }} />,
      title: 'AI Assistant',
      description: 'Get instant help from our AI-powered Git assistant whenever you need it',
      path: '/learn',
      color: '#c8e6c9', // light green
    },
  ]; 

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #f5f5f5 30%, #ffffff 90%)',
        display: 'flex',
        flexDirection: 'column',
        pb: '100px',
      }}
    >
      <Container maxWidth="lg" sx={{ flexGrow: 1, pt: 4 }}>
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 8,
            mt: 4,
            animation: 'fadeIn 1s ease-in',
            '@keyframes fadeIn': {
              '0%': {
                opacity: 0,
                transform: 'translateY(20px)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #2196f3 30%, #f50057 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
            }}
          >
            Master Git & GitHub
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Learn version control with Git through interactive tutorials,
            hands-on practice, and real-world simulations. Perfect for beginners
            and advanced users alike.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 6 }}>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/training"
              sx={{
                borderRadius: '28px',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                boxShadow: theme.shadows[4],
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[8],
                  transition: 'all 0.3s ease',
                },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Start Learning
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/learn"
              sx={{
                borderRadius: '28px',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease',
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  background: `linear-gradient(45deg, ${feature.color}50 0%, ${feature.color}20 100%)`,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: 'divider',
                  animation: 'slideUp 0.5s ease-out forwards',
                  animationDelay: `${index * 0.2}s`,
                  opacity: 0,
                  '@keyframes slideUp': {
                    '0%': {
                      opacity: 0,
                      transform: 'translateY(20px)',
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8],
                  },
                  cursor: 'pointer',
                }}
                onClick={() => handleFeatureClick(feature.path)}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 4,
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: '50%',
                      background: 'white',
                      boxShadow: theme.shadows[2],
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      mt: 'auto',
                      borderRadius: '28px',
                      textTransform: 'none',
                      '&:hover': {
                        transform: 'translateX(4px)',
                        transition: 'transform 0.3s ease',
                      },
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Explore
                  </Button>
                </CardContent>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Bottom Bar */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(45deg, #2196f3 30%, #1976d2 90%)',
          color: 'white',
          py: 2,
          zIndex: 1000,
          boxShadow: '0px -2px 10px rgba(0,0,0,0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1, minWidth: '200px' }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 700,
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                Ready to Begin Your Git Journey?
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  opacity: 0.9,
                }}
              >
                Start mastering Git today
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/training"
              sx={{
                borderRadius: '28px',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[8],
                },
                boxShadow: theme.shadows[4],
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 