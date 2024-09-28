import { Router } from 'express';
import pool from '../config/database';
import { ResultSetHeader } from 'mysql2';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [assets] = await pool.query('SELECT * FROM asset');
    res.json(assets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting asset data.' });
  }
});

router.post('/', async (req, res) => {
  const { asset_serial, asset_ip_id, asset_model, asset_description, asset_price } = req.body;

  try {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO asset (asset_serial, asset_ip_id, asset_model, asset_description, asset_price) VALUES (?, ?, ?, ?, ?)',
      [asset_serial, asset_ip_id, asset_model, asset_description, asset_price]
    );

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding asset.' });
  }
});

export default router;
