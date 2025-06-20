import { Metric } from "../models/metric.js";


export const getMetrics = async (req, res) => {
  const data = await Metric.find();
  res.json(data);
};

export const addMetric = async (req, res) => {
  const metric = new Metric(req.body);
  await metric.save();
  req.io.emit('update-metrics', metric); // real-time push
  res.status(201).json(metric);
};