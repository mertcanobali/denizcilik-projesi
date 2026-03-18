import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 1. Şirketi Tanımla (X Firması)
  const company = await prisma.company.create({
    data: { name: "X Denizcilik Grubu" },
  });

  // 2. Filodaki 4 Gemiyi Kaydet
  const ships = ["A Gemisi", "B Gemisi", "C Gemisi", "D Gemisi"];
  for (const name of ships) {
    await prisma.ship.create({
      data: {
        name,
        companyId: company.id,
        imoNumber: `IMO${Math.floor(1000000 + Math.random() * 9000000)}`,
      },
    });
  }

  // 3. A Gemisi İçin İlk Teknik Veriyi Gir [cite: 8, 10]
  const aShip = await prisma.ship.findFirst({ where: { name: "A Gemisi" } });
  if (aShip) {
    await prisma.report.create({
      data: {
        shipId: aShip.id,
        data: {
          navigation: { draft: 10.5, speed: 14.2, weather: "Light Breeze" },
          fuel: { hfo_me: 24.5, mgo_dg: 1.2 }, // [cite: 9]
          mainEngine: { load: 85, rpm: 102, exhaust_temp_avg: 385 }, // [cite: 10]
        },
      },
    });
  }
  console.log("🚀 Veritabanı test verileriyle başarıyla dolduruldu!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
