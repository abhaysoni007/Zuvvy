export const surveyQuestions = [
  {
    id: 'userType',
    prompt: 'Who are you?',
    type: 'choice',
    options: [
      { label: "I'm a Kid", value: 'kid' },
      { label: "I'm a Parent", value: 'parent' },
      { label: "I'm a Teacher", value: 'teacher' }
    ]
  },
  {
    id: 'phoneBehavior',
    prompt: 'What do kids usually do on phones?',
    type: 'choice',
    multiple: true,
    options: [
      { label: 'Watch short videos', value: 'videos' },
      { label: 'Play games', value: 'games' },
      { label: 'Create or build things', value: 'create' },
      { label: 'Learn with apps', value: 'learn' }
    ]
  },
  {
    id: 'biggestProblem',
    prompt: 'What feels like the biggest problem right now?',
    type: 'choice',
    multiple: true,
    options: [
      { label: 'Too much scrolling', value: 'scrolling' },
      { label: 'Passive screen time', value: 'passive' },
      { label: 'Not enough safe apps', value: 'safety' },
      { label: 'Not enough creativity', value: 'creativity' }
    ]
  },
  {
    id: 'wouldUse',
    prompt: 'Would your family or class use Zuvvy?',
    type: 'choice',
    options: [
      { label: 'Yes, absolutely', value: 'yes' },
      { label: 'Maybe, tell me more', value: 'maybe' },
      { label: 'Not sure yet', value: 'unsure' }
    ]
  },
  {
    id: 'excitesMost',
    prompt: 'What excites you most about Zuvvy?',
    type: 'choice',
    multiple: true,
    options: [
      { label: 'Creative missions', value: 'missions' },
      { label: 'Rewards for ideas', value: 'rewards' },
      { label: 'Safe kid-friendly space', value: 'safe-space' },
      { label: 'Family and classroom fun', value: 'family-fun' }
    ]
  },
  {
    id: 'suggestions',
    prompt: 'Any cool idea for Zuvvy?',
    type: 'text',
    placeholder: 'Type your idea (optional)'
  },
  {
    id: 'email',
    prompt: 'Want updates when Zuvvy launches?',
    type: 'email',
    placeholder: 'Email (optional)'
  }
];
