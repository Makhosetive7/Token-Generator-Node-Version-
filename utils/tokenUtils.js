export const generateSerielNumber = () => {
  return Math.random().toString(15).substring(2, 18).toLocaleLowerCase();
};


export const generateToken = () => {
    return Math.random().toString(10).substring(2, 20).toLocaleLowerCase()
}

export const calculateKwFromAmount = (amount) => {
  const conversionRate = 1.5; 
  return parseFloat((amount * conversionRate).toFixed(2));
};

export const getTokenExpiryDate = () => {
  const now = new Date();
  now.setMonth(now.getMonth() + 3); 
  return now;
};