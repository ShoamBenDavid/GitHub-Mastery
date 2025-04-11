import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  Paper,
  Divider,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Link
} from '@mui/material';
import {
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Facebook as FacebookIcon,
  Email as EmailIcon
} from '@mui/icons-material';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    github?: string;
    facebook?: string;
    email?: string;
  }
}

const AboutUs: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Alex Johnson",
      role: "Founder & Lead Developer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Git expert with over 10 years of experience in version control systems and software development.",
      social: {
        linkedin: "https://linkedin.com/in/alexjohnson",
        github: "https://github.com/alexj",
        facebook: "https://facebook.com/alexj",
        email: "alex@gitmastery.com"
      }
    },
    {
      name: "Sarah Chen",
      role: "Education Director",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Former CS professor with a passion for creating accessible learning experiences for developers.",
      social: {
        linkedin: "https://linkedin.com/in/sarahchen",
        github: "https://github.com/sarahc",
        email: "sarah@gitmastery.com"
      }
    },
    {
      name: "Michael Rodriguez",
      role: "Content Creator",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      bio: "Technical writer and Git enthusiast focused on creating clear, concise tutorials for all skill levels.",
      social: {
        github: "https://github.com/mrodriguez",
        facebook: "https://facebook.com/mrodriguez",
        email: "michael@gitmastery.com"
      }
    },
    {
      name: "Priya Patel",
      role: "UX/UI Designer",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      bio: "Designer with expertise in creating intuitive user experiences for educational platforms.",
      social: {
        linkedin: "https://linkedin.com/in/priyapatel",
        facebook: "https://facebook.com/priyap",
        email: "priya@gitmastery.com"
      }
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* About Us Text Section */}
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          About Git Mastery
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Typography variant="h6" paragraph sx={{ maxWidth: '800px', mx: 'auto', mb: 3 }}>
          At Git Mastery, we're dedicated to making version control accessible to everyone.
        </Typography>
        <Typography paragraph sx={{ maxWidth: '800px', mx: 'auto' }}>
          Our mission is to provide the most comprehensive Git learning platform, designed
          for both beginners and experienced developers. We believe that mastering Git is
          essential for modern software development, and we're here to make that journey
          as smooth as possible.
        </Typography>
        <Typography paragraph sx={{ maxWidth: '800px', mx: 'auto' }}>
          Founded in 2023, our team of experienced developers and educators has created
          a platform that combines interactive tutorials, hands-on exercises, and real-world
          simulations to help you build confidence and proficiency with Git.
        </Typography>
      </Box>
      
      {/* Team Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      mb: 2,
                      border: '4px solid',
                      borderColor: 'primary.light'
                    }}
                  />
                  <Typography variant="h6" component="h3" align="center">
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom align="center">
                    {member.role}
                  </Typography>
                </Box>
                <CardContent sx={{ flexGrow: 1, px: 3 }}>
                  <Typography variant="body2" paragraph>
                    {member.bio}
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                  {member.social.linkedin && (
                    <IconButton 
                      aria-label="linkedin" 
                      component={Link} 
                      href={member.social.linkedin} 
                      target="_blank"
                      color="primary"
                    >
                      <LinkedInIcon />
                    </IconButton>
                  )}
                  {member.social.github && (
                    <IconButton 
                      aria-label="github" 
                      component={Link} 
                      href={member.social.github} 
                      target="_blank"
                      color="primary"
                    >
                      <GitHubIcon />
                    </IconButton>
                  )}
                  {member.social.facebook && (
                    <IconButton 
                      aria-label="facebook" 
                      component={Link} 
                      href={member.social.facebook} 
                      target="_blank"
                      color="primary"
                    >
                      <FacebookIcon />
                    </IconButton>
                  )}
                  {member.social.email && (
                    <IconButton 
                      aria-label="email" 
                      component={Link} 
                      href={`mailto:${member.social.email}`} 
                      color="primary"
                    >
                      <EmailIcon />
                    </IconButton>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* Our Values Section */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Values
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h6" gutterBottom color="primary.main">
                Education First
              </Typography>
              <Typography variant="body1">
                We believe in providing clear, concise, and practical education
                that empowers developers at all stages of their career.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h6" gutterBottom color="primary.main">
                Continuous Improvement
              </Typography>
              <Typography variant="body1">
                Just like the version control system we teach, we're constantly
                iterating and improving our platform based on user feedback.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h6" gutterBottom color="primary.main">
                Community Driven
              </Typography>
              <Typography variant="body1">
                We're building a community of Git enthusiasts who learn from each
                other and contribute to the collective knowledge.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutUs; 