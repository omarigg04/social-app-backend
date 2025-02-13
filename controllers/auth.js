const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    // Registra al usuario en Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name } // Datos adicionales que quieras guardar en Supabase
      }
    });

    if (error) {
      throw error;
    }

    // Respuesta exitosa
    res.status(201).json({ message: '¡Usuario registrado!', user: data.user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Inicia sesión en Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      const err = new Error('Credenciales inválidas');
      err.statusCode = 401;
      throw err;
    }

    // Respuesta exitosa
    res.status(200).json({ 
      token: data.session.access_token, // Usa el access_token de Supabase
      userId: data.user.id // Usa el ID de Supabase
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    // Cierra la sesión en Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    // Respuesta exitosa
    res.status(200).json({ message: '¡Sesión cerrada!' });
  } catch (err) {
    next(err);
  }
};