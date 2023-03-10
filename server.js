const express = require('express');
const mongodb = require('mongoose');
const Product = require('./models/productSchema')
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req, res) => {
	res.send('hello')
})

app.get('/products', async (req, res) => {
	try {
		const product = await Product.find();
		res.status(200).json(product);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message })
	}
})

app.get('/products/:id', async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findById(id)
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

app.post('/product', async (req, res) => {
	try {
		// const product = await Product.create(req.body.title)
		const prod = new Product({
			title: req.body.title
		})
		await prod.save()
		res.status(200).json(prod)
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message })
	}
})

app.put('/products/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body)
		if (!product) {
			return res.status(404).json({ message: 'cannot find any product' })
		}
		const updatedProduct = await Product.findById(id)
		res.status(200).json(updatedProduct)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

app.delete('/products/:id', async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findByIdAndDelete(id)
		if (!product) {
			return res.status(404).json({ message: 'cannot find any product' })
		}
		res.status(200).json(product)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

mongodb.set('strictQuery', false);
const PORT = process.env.PORT || 4444;
mongodb.connect('mongodb+srv://asadbek:parametr@crud.cglkqhx.mongodb.net/Node-Api?retryWrites=true&w=majority')
	.then(() => {
		console.log('connected to mongodb');
		app.listen(PORT, () => {
			console.log(`server is running ${PORT}`);
		})
	}).catch((err) => {
		console.log(err);
	})