"""Descuentos_Producto

Revision ID: 090d0bbf2277
Revises: ae9bc20c78c5
Create Date: 2024-05-01 04:39:47.072842

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '090d0bbf2277'
down_revision: Union[str, None] = 'ae9bc20c78c5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('products', sa.Column('discount_percentage', sa.Float(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('products', 'discount_percentage')
    # ### end Alembic commands ###
