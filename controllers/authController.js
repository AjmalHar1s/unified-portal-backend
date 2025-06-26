import User from '../models/User.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });

    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const newUser = await User.create({ name, email, password, role });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password)
      return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json(user); // Later return JWT
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
