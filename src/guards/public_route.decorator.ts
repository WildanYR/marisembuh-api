import { SetMetadata } from '@nestjs/common';
import { PUBLIC_ROUTE } from 'src/constants';

export const PublicRoute = () => SetMetadata(PUBLIC_ROUTE, true);
