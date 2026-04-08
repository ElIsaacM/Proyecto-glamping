(async () => {
    try {
        const res = await fetch('http://localhost:3000/api/cabins/stats');
        const data = await res.json();
        console.log("SERVER STATS:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(e);
    }
})();
