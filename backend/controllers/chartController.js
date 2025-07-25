const getChartData = async (req, res) => {
  try {
    // You can later fetch this from MongoDB
    const data = [
      { month: 'Jan', sales: 400, revenue: 2400 },
      { month: 'Feb', sales: 300, revenue: 2210 },
      { month: 'Mar', sales: 500, revenue: 2290 },
      { month: 'Apr', sales: 200, revenue: 2000 }
    ];
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
};

module.exports = { getChartData };
