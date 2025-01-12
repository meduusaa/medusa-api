import { Request, Response } from 'express';
import client from '@/config/elasticSearch';


interface SearchQueryParams {
    query: string; // `query` must be a string
    page?: string; // Optional, defaults to 1
    size?: string; // Optional, defaults to 10
}

export const search = async (req: Request<{}, {}, {}, SearchQueryParams>, res: Response): Promise<void> => {
    const { query, page = 1, size = 10 } = req.query;
  
    if (!query) {
      res.status(400).json({ error: 'Query parameter is required.' });
      return;
    }

    if (typeof query !== 'string') {
        res.status(400).json({ error: 'Query must be a string.' });
        return;
    }
      
  
    const from = (Number(page) - 1) * Number(size);
  
    try {
      const response = await client.search({
        index: 'my_index', // Replace with your index name
        body: {
          query: {
            match: {
              content: query, // Search the "content" field
            },
          },
          from,
          size: Number(size),
          track_total_hits: true,
        },
      });

      const total = 
        typeof response.hits.total === 'number' 
            ? response.hits.total 
            : response.hits.total?.value;
  
      res.status(200).json({
        results: response.hits.hits.map((hit) => hit._source),
        total: total || 0,
        page: Number(page),
        size: Number(size),
      });
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };