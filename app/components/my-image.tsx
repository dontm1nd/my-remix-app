export default function MyImage({ imageid }: { imageid: string }) {
    return (
        <div>
            <a href={`/image/${imageid}`} target="_new">
                <img src={`/image/${imageid}`} alt="image-${imageid}" width="100" height="100" />
            </a>
        </div>
    );
}