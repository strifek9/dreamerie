"""Native pixel/ICC-exact V4 originals and padded clue crops; preserve all V3 files."""
import importlib.util
from pathlib import Path
root = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('delivery', root / 'scripts/prepareArtworkDeliveryV1.py')
delivery = importlib.util.module_from_spec(spec)
spec.loader.exec_module(delivery)
delivery.CATALOGUE_EXPORT = 'v4DeliveryDreams'
delivery.PREFIX = '/artwork/v4/delivery-lossless-v1/'
delivery.AUDIT = root / 'docs/artwork/V4_DELIVERY_LOSSLESS_V1.json'
delivery.MANIFEST = root / 'src/v4/artworkDelivery.generated.ts'
if __name__ == '__main__':
    delivery.main()
