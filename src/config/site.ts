export interface PillarItem {
  title: string;
  description: string;
}

export interface SiteConfig {
  language?: "pt-BR" | "en";
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
    logoPath: string;
    faviconPath: string;
    cityState: string;
    region: string;
  };
  contact: {
    whatsappNumber: string;
    displayPhone: string;
    secondaryPhones?: string;
    email: string;
    addresses: string[];
    neighborhood: string;
    cityStateZip: string;
    mapsUrl: string;
    businessHours: {
      weekdays: string;
      saturdays: string;
      sundays: string;
    };
  };
  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
  };
  media: {
    heroVideoSrc?: string;
    showroomBannerImage: string;
  };
  pillars: PillarItem[];
  seo: {
    siteUrl: string;
    keywords: string[];
  };
}

export const siteConfig: SiteConfig = {
  language: "pt-BR",
  brand: {
    name: "Zap Motors Veículos Multimarcas",
    shortName: "ZAP MOTORS",
    tagline: "COMPRA, VENDA, TROCA & CONSIGNAÇÃO · DESDE 2020",
    description:
      "Consultoria personalizada na compra e venda de veículos multimarcas em Sorocaba e região. Qualidade, procedência e laudo cautelar aprovado.",
    logoPath: "/ig-logo.jpg",
    faviconPath: "/favicon.png",
    cityState: "SOROCABA · SP",
    region: "Jardim Simus · Sorocaba",
  },
  contact: {
    whatsappNumber: "5515991195289",
    displayPhone: "(15) 99119-5289",
    secondaryPhones: "Vendas: (15) 99155-5659 · (15) 99201-1184",
    email: "zapmotorsveiculos.com.br",
    addresses: ["Rua Dr. Joaquim José Batista Ferreira, 150 - Jardim Simus"],
    neighborhood: "Jardim Simus",
    cityStateZip: "Sorocaba - SP · CEP 18055-271",
    mapsUrl:
      "https://www.google.com/maps/search/Rua+Doutor+Joaquim+Jos%C3%A9+Batista+Ferreira,+150,+Jardim+Simus,+Sorocaba,+SP",
    businessHours: {
      weekdays: "Atendimento Online e Presencial no Showroom",
      saturdays: "Compra, Venda, Troca & Consignação",
      sundays: "Agendamento Personalizado via WhatsApp",
    },
  },
  social: {
    instagram: "https://www.instagram.com/zap_motors/",
    facebook: "https://www.facebook.com/p/ZAP-Motors-100063647904306/",
  },
  media: {
    showroomBannerImage: "/showroom-zap.jpg",
  },
  pillars: [
    {
      title: "QUALIDADE & PROCEDÊNCIA",
      description:
        "Veículos multimarcas rigorosamente selecionados, revisados e com laudo cautelar 100% aprovado.",
    },
    {
      title: "ATENDIMENTO ONLINE",
      description:
        "Consultoria personalizada pelo WhatsApp do primeiro contato até a entrega das chaves em sua cidade.",
    },
    {
      title: "FINANCIAMENTO & TROCA",
      description:
        "Aprovação ágil de financiamento sem burocracia e avaliação transparente do seu veículo na troca.",
    },
    {
      title: "CONSIGNAÇÃO ESTRATÉGICA",
      description:
        "Estrutura completa no Jardim Simus e divulgação digital de alto alcance para vender seu carro com segurança.",
    },
  ],
  seo: {
    siteUrl: "https://zapmotorsveiculos.com.br",
    keywords: [
      "Zap Motors Sorocaba",
      "Zap Motors Veículos Multimarcas",
      "Carros Seminovos Sorocaba",
      "Chevrolet Tracker Sorocaba",
      "Hyundai Tucson Sorocaba",
      "Chery Tiggo 5X Sorocaba",
      "Compra e Venda de Veículos Jardim Simus",
    ],
  },
};
