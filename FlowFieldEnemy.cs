using UnityEngine;

public class FlowFieldEnemy : MonoBehaviour
{
    private IFlowFieldReader flowFieldReader;
    private Transform playerTransform;
    private EnemyStats stats;

    private void Awake()
    {
        stats = GetComponent<EnemyStats>();
    }

    public void Initialize(IFlowFieldReader flowfield, Transform player)
    {
        flowFieldReader = flowfield;
        playerTransform = player;
    }

    private void Update()
    {
        if (flowFieldReader == null) return;

        Vector2 dir = flowFieldReader.GetDirectionAt(transform.position);

        if (dir == Vector2.zero && playerTransform != null)
        {
            Vector3 toPlayer = playerTransform.position - transform.position;
            dir = new Vector2(toPlayer.x, toPlayer.y).normalized;
        }

        Vector3 moveDir = new Vector3(dir.x, dir.y, 0f);
        transform.position += moveDir * stats.enemySpeed * Time.deltaTime;
    }
}
