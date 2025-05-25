import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

export const initializePassport = () => {
  // GitHub Strategy
  passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  scope: ['user:email', 'repo'],
  userProfileURL: 'https://api.github.com/user' // Ensures consistent endpoint
}, (accessToken, refreshToken, profile, done) => {
  // Normalize profile data
  const userProfile = {
    id: profile.id,
    username: profile.username || profile.login || profile.id.toString(),
    displayName: profile.displayName || profile.username || profile.login || `GitHub User ${profile.id}`,
    emails: profile.emails || [],
    photos: profile.photos || [],
    accessToken: accessToken
  };
  return done(null, userProfile);
}));

  // JWT Strategy for protected routes
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };

  passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    // Simply return the payload since we're not verifying against a database
    return done(null, jwtPayload);
  }));

  // Serialization (minimal implementation)
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export const generateToken = (user) => {
  console.log("Generating token for user:", user);
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      avatar: user.avatar
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' } // Extended to 7 days for better persistence
  );
};