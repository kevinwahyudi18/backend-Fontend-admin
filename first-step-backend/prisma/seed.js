const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  try {
    // Seed untuk Admin
    const admin = await prisma.admin.create({
      data: {
        username: "hendika",
        email: "sukiem@example.com",
        password: "sukiem",
        address: "jalan sukiem",
      },
    });

    // Seed untuk Category
    const category1 = await prisma.category.create({
      data: {
        category_name: "makanan bayi",
      },
    });

    const category2 = await prisma.category.create({
      data: {
        category_name: "pakaian Bayi",
      },
    });

    // Seed untuk Warehouse
    const warehouse1 = await prisma.warehouse.create({
      data: {
        admin_id: admin.id,
        warehouse_name: "Main Warehouse",
        address: "jalan bekasi",
      },
    });

    const warehouse2 = await prisma.warehouse.create({
      data: {
        admin_id: admin.id,
        warehouse_name: "second Warehouse",
        address: "jalan jakarta",
      },
    });

    // Seed untuk User
    const user1 = await prisma.user.create({
      data: {
        username: "hendika",
        email: "hendika@example.com",
        password: "hendika",
        phone: "077777",
      },
    });

    const user2 = await prisma.user.create({
      data: {
        username: "bangbang",
        email: "bangbang@example.com",
        password: "bangbang",
        phone: "8474773",
      },
    });

    // Seed untuk Address
    const address1 = await prisma.address.create({
      data: {
        user_id: user1.id,
        address: "jalan R.A Kartini",
        city: "Jakarta",
        postal_code: "12345",
        phone: "9876543210",
      },
    });
    const address2 = await prisma.address.create({
      data: {
        user_id: user1.id,
        address: "jalan Haji Nawi",
        city: "Jakarta",
        postal_code: "3213",
        phone: "837273",
      },
    });
    const address3 = await prisma.address.create({
      data: {
        user_id: user2.id,
        address: "jalan pondok indah",
        city: "Jakarta",
        postal_code: "723",
        phone: "3232",
      },
    });
    const address4 = await prisma.address.create({
      data: {
        user_id: user2.id,
        address: "jalan wijaya",
        city: "Jakarta",
        postal_code: "312",
        phone: "463633",
      },
    });

    // Seed untuk Cart
    const cart1 = await prisma.cart.create({
      data: {
        user_id: user1.id,
      },
    });
    const cart2 = await prisma.cart.create({
      data: {
        user_id: user2.id,
      },
    });

    // Seed untuk Product
    const product1 = await prisma.product.create({
      data: {
        category_id: category1.id,
        warehouse_id: warehouse1.id,
        name: "promina",
        description: "rasa pisang",
        type: "makanan",
      },
    });

    const product2 = await prisma.product.create({
      data: {
        category_id: category1.id,
        warehouse_id: warehouse1.id,
        name: "milna",
        description: "rasa strawberry",
        type: "makanan",
      },
    });

    const product3 = await prisma.product.create({
      data: {
        category_id: category2.id,
        warehouse_id: warehouse2.id,
        name: "celana hitam",
        description: "merek gucci",
        type: "pakaian",
      },
    });

    // Seed untuk Product_Detail
    const productDetail1 = await prisma.product_Detail.create({
      data: {
        product_id: product1.id,
        photo: "promina.jpg",
        color: "-",
        stock: 10,
        price: 12000,
        weight: 100,
      },
    });

    const productDetail2 = await prisma.product_Detail.create({
      data: {
        product_id: product2.id,
        photo: "milna.jpg",
        color: "-",
        stock: 10,
        price: 10000,
        weight: 100,
      },
    });
    const productDetail3 = await prisma.product_Detail.create({
      data: {
        product_id: product3.id,
        photo: "celana.jpg",
        color: "black",
        stock: 5,
        price: 2500000,
        weight: 100,
      },
    });

    // Seed untuk Cart_Product
    const cartProduct1 = await prisma.cart_Product.create({
      data: {
        product: { connect: { id: product1.id } },
        cart: { connect: { id: cart1.id } },
        quantity: 2,
        price: productDetail1.price * 2,
      },
    });

    const cartProduct2 = await prisma.cart_Product.create({
      data: {
        product: { connect: { id: product2.id } },
        cart: { connect: { id: cart1.id } },
        quantity: 3,
        price: productDetail2.price * 3,
      },
    });
    const cartProduct3 = await prisma.cart_Product.create({
      data: {
        product: { connect: { id: product2.id } },
        cart: { connect: { id: cart2.id } },
        quantity: 2,
        price: productDetail2.price * 2,
      },
    });

    const cartProduct4 = await prisma.cart_Product.create({
      data: {
        product: { connect: { id: product3.id } },
        cart: { connect: { id: cart2.id } },
        quantity: 1,
        price: productDetail3.price * 1,
      },
    });

    // Seed untuk Payment_Method
    const paymentMethod = await prisma.payment_Method.create({
      data: {
        value: "Credit Card",
      },
    });

    // Seed untuk Order
    const order1 = await prisma.order.create({
      data: {
        cart_id: cart1.id,
        address_id: address1.id,
        shipping_price: 15000,
        price: cartProduct1.price + cartProduct2.price,
      },
    });
    const order2 = await prisma.order.create({
      data: {
        cart_id: cart2.id,
        address_id: address3.id,
        shipping_price: 25000,
        price: cartProduct3.price + cartProduct4.price,
      },
    });

    // Seed untuk Payment
    const payment1 = await prisma.payment.create({
      data: {
        order_id: order1.id,
        cart_id: cart1.id,
        payment_method_id: paymentMethod.id,
        total_price: order1.price + order1.shipping_price,
      },
    });
    const payment2 = await prisma.payment.create({
      data: {
        order_id: order2.id,
        cart_id: cart2.id,
        payment_method_id: paymentMethod.id,
        total_price: order2.price + order2.shipping_price,
      },
    });

    // Seed untuk Order_Status
    const orderStatus = await prisma.order_Status.create({
      data: {
        order_id: order1.id,
        status: "Pending",
      },
    });
    const orderStatus2 = await prisma.order_Status.create({
      data: {
        order_id: order2.id,
        status: "Pending",
      },
    });

    console.log("Seed berhasil dijalankan");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
