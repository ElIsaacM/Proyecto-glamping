import pool from './src/config/db.js';
import { cabinStats } from './src/models/cabin.model.js';

(async () => {
    try {
        const stats = await pool.query(cabinStats.get_stats);
        console.log("Stats:", stats.rows);
        
        const total = await pool.query(cabinStats.total_cabins);
        console.log("Total Cabins:", total.rows);
        
        const graph = await pool.query(cabinStats.get_graph_revenue);
        console.log("Graph:", graph.rows);

    } catch (e) {
        console.error("Error:", e);
    }
    process.exit();
})();
