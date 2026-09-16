import "server-only";
import { cookies } from "next/headers";

export async function getAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;

  if (!token) {
    console.log("NO TOKEN");
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/data/get`,
      {
        method: "GET",
        headers: {
          Cookie: `adminToken=${token}`,
        },
        cache: "no-store",
      },
    );

    console.log("STATUS:", response.status);

    if (!response.ok) {
      console.log(
        "Failed to fetch admin data:",
        response.status,
        response.statusText,
      );
      return null;
    }

    const data = await response.json();

    return data.admin;
  } catch (error) {
    console.log("Error fetching admin data:", error);
    return null;
  }
}

export async function getCategories() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/categories/get`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.log("Failed to fetch categories:", response.statusText);

      return [];
    }

    const data = await response.json();

    return data.categories;
  } catch (error) {
    console.log("Error fetching categories:", error.message);

    return [];
  }
}

export async function getProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/products/get`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.log("Failed to fetch products:", response.statusText);
      return [];
    }

    const data = await response.json();
    return data.products;
  } catch (error) {
    console.log("Error fetching products:", error.message);
    return [];
  }
}

export async function getProduct(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/products/${id}/get`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.log("Failed to fetch product:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data.product;
  } catch (error) {
    console.log("Error fetching product:", error.message);
    return null;
  }
}

export async function getProductsByCategorie(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/categories/${id}/get`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.log("Failed to fetch categorie products:", response.statusText);
      return {
        categorie: null,
        products: [],
      };
    }

    const data = await response.json();

    return {
      categorie: data.categorie,
      products: data.products || [],
    };
  } catch (error) {
    console.log("Error fetching categorie products:", error.message);

    return {
      categorie: null,
      products: [],
    };
  }
}

// CLIENTS
export async function getClients() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/clients/get`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.log("Failed to fetch clients:", response.statusText);
      return [];
    }

    const data = await response.json();

    return data.clients;
  } catch (error) {
    console.log("Error fetching clients:", error.message);
    return [];
  }
}

export async function getClient(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/clients/${id}/get`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.log("Failed to fetch client:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data.client;
  } catch (error) {
    console.log("Error fetching client:", error.message);
    return null;
  }
}

export async function getOrdersByClient(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/clients/${id}/orders/get`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.log("Failed to fetch client orders:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data.orders;
  } catch (error) {
    console.log("Error fetching client orders:", error.message);
    return null;
  }
}

// ORDERS
export async function getOrders() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/orders/get`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.log("Failed to fetch orders:", response.statusText);
      return [];
    }

    const data = await response.json();

    return data.orders;
  } catch (error) {
    console.log("Error fetching orders:", error.message);
    return [];
  }
}

export async function getOrder(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/orders/${id}/get`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.log("Failed to fetch order:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data.order;
  } catch (error) {
    console.log("Error fetching order:", error.message);
    return null;
  }
}

export async function getLatestOrders() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/orders/latest/get`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.log("Failed to fetch latest orders:", response.statusText);
      return [];
    }

    const data = await response.json();

    return data.orders;
  } catch (error) {
    console.log("Error fetching latest orders:", error.message);
    return [];
  }
}

// COUPONS
export async function getCoupons() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/coupons/get`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.log("Failed to fetch coupons:", response.statusText);
      return [];
    }

    const data = await response.json();

    return data.coupons;
  } catch (error) {
    console.log("Error fetching coupons:", error.message);
    return [];
  }
}

export async function getCoupon(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/coupons/${id}/get`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.log("Failed to fetch coupon:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data.coupon;
  } catch (error) {
    console.log("Error fetching coupon:", error.message);
    return null;
  }
}

// MESSAGES
export async function getMessagesByClient(clientId) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")?.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/messages/${clientId}/get`,
      {
        method: "GET",
        headers: {
          Cookie: `adminToken=${token}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.log("Failed to fetch messages:", response.statusText);
      return [];
    }

    const data = await response.json();

    return data.data || [];
  } catch (error) {
    console.log("Error fetching messages:", error.message);
    return [];
  }
}

export async function getLatestMessages() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")?.value;

    if (!token) {
      console.log("No admin token");
      return [];
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/messages/latest/get`,
      {
        method: "GET",
        headers: {
          Cookie: `adminToken=${token}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.log("Failed to fetch latest messages:", response.statusText);

      return [];
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.log("Error fetching latest messages:", error.message);

    return [];
  }
}
